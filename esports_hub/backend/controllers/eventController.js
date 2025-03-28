import Event from "../models/Event.js";
import User from "../models/User.js";


export const getLatestEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error: Unable to fetch events" });
    }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Requires authentication)
export const createEvent = async (req, res) => {
    try {
        const { name, description, date, location } = req.body;

        const event = new Event({
            name,
            description,
            date,
            location,
            createdBy: req.user.id,
            participants: [],
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a user for an event
// @route   POST /api/events/:id/register
// @access  Private (Requires authentication)
export const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if user is already registered
        if (event.participants.includes(req.user.id)) {
            return res.status(400).json({ message: "User already registered for this event" });
        }

        event.participants.push(req.user.id);
        await event.save();

        res.json({ message: "Successfully registered for event", event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get participants of an event
// @route   GET /api/events/:id/participants
// @access  Private (Requires authentication)
export const getEventParticipants = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("participants", "name email");

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event.participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Requires authentication)
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this event" });
        }

        event.name = req.body.name || event.name;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Requires authentication)
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this event" });
        }

        await event.deleteOne();
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
