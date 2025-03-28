import express from "express";
import {
    getLatestEvents,
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getEventParticipants,
} from "../controllers/eventController.js";
import { protect, organizerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/latest", getLatestEvents);
// @route   GET /api/events
// @desc    Get all events & tournaments
// @access  Public
router.get("/", getAllEvents);

// @route   GET /api/events/:id
// @desc    Get a single event by ID
// @access  Public
router.get("/:id", getEventById);

// @route   POST /api/events
// @desc    Create a new event (Organizer only)
// @access  Private
router.post("/", protect, organizerOnly, createEvent);

// @route   PUT /api/events/:id
// @desc    Update event details (Only event creator)
// @access  Private
router.put("/:id", protect, organizerOnly, updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete an event (Only event creator)
// @access  Private
router.delete("/:id", protect, organizerOnly, deleteEvent);

// @route   POST /api/events/:id/register
// @desc    Register for an event (Gamers only)
// @access  Private
router.post("/:id/register", protect, registerForEvent);

// @route   GET /api/events/:id/participants
// @desc    Get all participants for an event (Organizer only)
// @access  Private
router.get("/:id/participants", protect, organizerOnly, getEventParticipants);

export default router;
