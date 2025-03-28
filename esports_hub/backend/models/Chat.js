import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    },
    { timestamps: true }
);

// Correctly export the model
const ChatRoom = mongoose.model("ChatRoom", chatSchema);
export default ChatRoom;
