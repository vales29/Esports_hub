import ChatRoom from "../models/Chat.js";
import Message from "../models/Message.js";
import bcrypt from "bcryptjs";

/**
 * @desc Create a new chat room (public or private)
 * @route POST /api/chatrooms
 * @access Private (Only authenticated users)
 */
export const createChatRoom = async (req, res) => {
    try {
        const { name, isPrivate, password } = req.body;

        const chatRoom = new ChatRoom({
            name,
            isPrivate,
            password: isPrivate ? await bcrypt.hash(password, 10) : null,
                                      createdBy: req.user.id,
                                      members: [req.user.id], // Creator is the first member
        });

        await chatRoom.save();
        res.status(201).json({ message: "Chat room created successfully", chatRoom });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * @desc Get all chat rooms (only public or private rooms where the user is a member)
 * @route GET /api/chatrooms
 * @access Private (Authenticated users)
 */
export const getChatRooms = async (req, res) => {
    try {
        const chatRooms = await ChatRoom.find({
            $or: [{ isPrivate: false }, { members: req.user.id }],
        }).select("-password");

        res.json(chatRooms);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * @desc Join a private chat room
 * @route POST /api/chatrooms/join/:id
 * @access Private (Authenticated users)
 */
export const joinChatRoom = async (req, res) => {
    try {
        const { password } = req.body;
        const chatRoom = await ChatRoom.findById(req.params.id);

        if (!chatRoom) {
            return res.status(404).json({ error: "Chat room not found" });
        }

        if (!chatRoom.isPrivate) {
            return res.status(400).json({ error: "This is a public chat room" });
        }

        const isMatch = await bcrypt.compare(password, chatRoom.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        if (!chatRoom.members.includes(req.user.id)) {
            chatRoom.members.push(req.user.id);
            await chatRoom.save();
        }

        res.json({ message: "Joined chat room successfully", chatRoom });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * @desc Get messages from a chat room
 * @route GET /api/chatrooms/:id/messages
 * @access Private (Only members of the chat room)
 */
export const getChatMessages = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findById(req.params.id);

        if (!chatRoom) {
            return res.status(404).json({ error: "Chat room not found" });
        }

        if (chatRoom.isPrivate && !chatRoom.members.includes(req.user.id)) {
            return res.status(403).json({ error: "Access denied" });
        }

        const messages = await Message.find({ chatRoom: req.params.id }).populate("sender", "username avatar");
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * @desc Send a message in a chat room
 * @route POST /api/chatrooms/:id/messages
 * @access Private (Only members of the chat room)
 */
export const sendMessage = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findById(req.params.id);

        if (!chatRoom) {
            return res.status(404).json({ error: "Chat room not found" });
        }

        if (chatRoom.isPrivate && !chatRoom.members.includes(req.user.id)) {
            return res.status(403).json({ error: "Access denied" });
        }

        const message = new Message({
            chatRoom: req.params.id,
            sender: req.user.id,
            content: req.body.content,
        });

        await message.save();
        res.status(201).json({ message: "Message sent", messageData: message });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
