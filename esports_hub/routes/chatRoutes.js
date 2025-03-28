import express from "express";
import {
    getChatRooms,
    createChatRoom,
    joinChatRoom,
    getChatMessages,
    sendMessage,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/chatrooms
// @desc    Get all chat rooms (public + private joined rooms)
// @access  Private
router.get("/", protect, getChatRooms);

// @route   POST /api/chatrooms
// @desc    Create a new chat room (public or private)
// @access  Private
router.post("/", protect, createChatRoom);

// @route   POST /api/chatrooms/join/:id
// @desc    Join a private chat room with a password
// @access  Private
router.post("/join/:id", protect, joinChatRoom);

// @route   GET /api/chatrooms/:id/messages
// @desc    Get all messages in a chat room
// @access  Private (Only members of the room)
router.get("/:id/messages", protect, getChatMessages);

// @route   POST /api/chatrooms/:id/messages
// @desc    Send a message in a chat room
// @access  Private (Only members of the room)
router.post("/:id/messages", protect, sendMessage);

export default router;
