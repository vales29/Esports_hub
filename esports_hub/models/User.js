import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 15,
            match: /^[a-zA-Z0-9]+$/,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 20,
        },
        avatar: {
            type: String,
            default: "https://img.freepik.com/premium-photo/icon-define-person-allocate-stylize-250_1137696-4501.jpg",
        },
        bio: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ["gamer", "organizer"],
            required: true,
        },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        tournamentsParticipated: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
