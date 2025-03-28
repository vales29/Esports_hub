import express from "express";
import multer from "multer";
import User from "../models/User.js";

const router = express.Router();

// ✅ Multer for avatar upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
                                   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Get user profile
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Update user profile
router.put("/:id", async (req, res) => {
    try {
        const { username, bio, realName, phone, location, paymentDetails } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, bio, realName, phone, location, paymentDetails },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Upload new avatar
router.put("/:id/avatar", upload.single("avatar"), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { avatar: `/uploads/${req.file.filename}` }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to upload avatar" });
    }
});

export default router;
