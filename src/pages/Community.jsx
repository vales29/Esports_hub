import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/api";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL); // Connect to WebSocket

const Community = () => {
    const { user } = useAuth(); // Get logged-in user
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch chat history
        const fetchMessages = async () => {
            try {
                const res = await axios.get("/chat");
                setMessages(res.data);
            } catch (err) {
                setError("Failed to load chat.");
            }
        };

        fetchMessages();

        // Listen for new messages from the socket
        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const msgData = { username: user?.username, text: newMessage };

        try {
            await axios.post("/chat", msgData); // Save to DB
            socket.emit("message", msgData); // Send to WebSocket
            setNewMessage(""); // Clear input
        } catch (err) {
            setError("Message failed to send.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
        <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">💬 Community Chat</h1>

        <div className="h-80 overflow-y-auto bg-gray-700 p-4 rounded-lg mb-4">
        {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
        ) : (
            messages.map((msg, index) => (
                <div key={index} className="mb-2">
                <span className="font-semibold text-blue-400">{msg.username}: </span>
                <span>{msg.text}</span>
                </div>
            ))
        )}
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {user ? (
            <div className="flex items-center gap-2">
            <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-gray-700 rounded text-white outline-none"
            />
            <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
            Send
            </button>
            </div>
        ) : (
            <p className="text-gray-400 text-center">Log in to join the chat.</p>
        )}
        </div>
        </div>
    );
};

export default Community;
