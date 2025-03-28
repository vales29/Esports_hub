import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";

const EventDetails = () => {
    const { id } = useParams(); // Get event ID from URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState(false);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const res = await axios.get(`/events/${id}`);
                setEvent(res.data);
                setParticipants(res.data.participants);
            } catch (err) {
                setError("Event not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    const handleRegister = async () => {
        try {
            await axios.post(`/events/${id}/register`);
            setRegistered(true);
            setParticipants([...participants, { username: "You" }]); // Fake update until backend syncs
        } catch (err) {
            setError("Failed to register. Try again.");
        }
    };

    if (loading) return <p className="text-center text-gray-400">Loading event details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-400 mb-2">{event.date}</p>
        <p className="text-lg mb-4">{event.description}</p>

        {event.prize && <p className="text-green-400 font-semibold">🏆 Prize: {event.prize}</p>}

        {!registered ? (
            <button onClick={handleRegister} className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            Register for Event
            </button>
        ) : (
            <p className="mt-4 text-green-400">✅ You are registered for this event.</p>
        )}

        <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Participants</h2>
        {participants.length === 0 ? (
            <p className="text-gray-400">No participants yet.</p>
        ) : (
            <ul className="space-y-2">
            {participants.map((p, index) => (
                <li key={index} className="bg-gray-700 p-2 rounded">{p.username}</li>
            ))}
            </ul>
        )}
        </div>
        </div>
        </div>
    );
};

export default EventDetails;
