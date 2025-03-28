import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import http from "http";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
const server = http.createServer(app); // ✅ Create HTTP server

// ✅ Configure CORS properly
app.use(
    cors({
        origin: "http://localhost:5173", // ✅ Allow only your frontend
        credentials: true, // ✅ Allow sending cookies, tokens, etc.
    })
);

// Middleware
app.use(express.json()); // JSON body parser
app.use(morgan("dev")); // Logger

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/chats", chatRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Gaming Community API is Running...");
});

// ✅ Initialize WebSocket Server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// ✅ Handle WebSocket Connections
io.on("connection", (socket) => {
    console.log("🟢 New user connected:", socket.id);

    socket.on("joinRoom", ({ username, room }) => {
        socket.join(room);
        console.log(`👤 ${username} joined room: ${room}`);
    });

    socket.on("sendMessage", (data) => {
        io.to(data.room).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
