import { useEffect, useState } from "react";
import axios from "../utils/api";
import EventCard from "../components/EventCard";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/events");
                setEvents(response.data);
            } catch (err) {
                setError("Failed to load events. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Tournaments & Events</h2>

        {loading && <p className="text-center text-gray-400">Loading events...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && events.length === 0 && (
            <p className="col-span-full text-center text-gray-400">No upcoming events found.</p>
        )}
        {events.map((event) => (
            <EventCard key={event._id} event={event} />
        ))}
        </div>
        </div>
        </div>
    );
};

export default Events;
