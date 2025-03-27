import { useEffect, useState } from "react";
import axios from "../utils/api";

const OrganizerDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        date: "",
        prize: "",
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("/events/organizer");
                setEvents(res.data);
            } catch (err) {
                setError("Failed to load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (!newEvent.title || !newEvent.date) return;

        try {
            const res = await axios.post("/events", newEvent);
            setEvents([...events, res.data]);
            setNewEvent({ title: "", description: "", date: "", prize: "" });
        } catch (err) {
            console.error("Failed to create event.");
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`/events/${eventId}`);
            setEvents(events.filter((event) => event._id !== eventId));
        } catch (err) {
            console.error("Failed to delete event.");
        }
    };

    if (loading) return <p className="text-center text-gray-400">Loading dashboard...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Organizer Dashboard</h1>

        {/* Event Creation Form */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        <form onSubmit={handleCreateEvent} className="space-y-3">
        <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 rounded"
        required
        />
        <textarea
        name="description"
        placeholder="Event Description"
        value={newEvent.description}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 rounded"
        ></textarea>
        <input
        type="date"
        name="date"
        value={newEvent.date}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 rounded"
        required
        />
        <input
        type="text"
        name="prize"
        placeholder="Prize (Optional)"
        value={newEvent.prize}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 rounded"
        />
        <button type="submit" className="w-full p-2 bg-green-600 rounded hover:bg-green-700">
        Create Event
        </button>
        </form>
        </div>

        {/* Events List */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Your Events</h2>
        {events.length === 0 ? (
            <p className="text-gray-400">No events created yet.</p>
        ) : (
            <ul className="space-y-4">
            {events.map((event) => (
                <li key={event._id} className="bg-gray-700 p-3 rounded flex justify-between">
                <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-400">{event.date}</p>
                </div>
                <button
                onClick={() => handleDeleteEvent(event._id)}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                >
                Delete
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
        </div>
        </div>
    );
};

export default OrganizerDashboard;
