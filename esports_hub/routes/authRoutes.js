import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // 🔹 Backend Validation
        const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Username must be 3-15 characters and contain only letters and numbers." });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address." });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be 6-20 characters and include at least one letter and one number." });
        }

        if (!role || !["gamer", "organizer"].includes(role)) {
            return res.status(400).json({ message: "Invalid role selection." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered!" });

        // ✅ Store user with validated data
        const newUser = new User({ username, email, password, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error, try again later." });
    }
});


// Login user (without encrypted password check)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Directly compare plain text passwords
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error, try again later." });
    }
});

export default router;
