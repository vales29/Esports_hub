import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        game: {
            type: String,
            required: true,
        },
        eventDate: {
            type: Date,
            required: true,
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        participants: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                status: {
                    type: String,
                    enum: ["pending", "accepted", "rejected"],
                    default: "pending",
                },
            },
        ],
        maxParticipants: {
            type: Number,
                    default: 100,
        },
        entryFee: {
            type: Number,
                    default: 0, // Free by default
        },
        prizePool: {
            type: Number,
                    default: 0,
        },
        eventType: {
            type: String,
            enum: ["public", "private"],
                    default: "public",
        },
        eventPassword: {
            type: String, // Only required for private events
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
