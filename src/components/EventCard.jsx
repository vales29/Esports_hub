import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
        <img src={event.image || "/default-event.jpg"} alt={event.name} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-xl font-semibold mt-3">{event.name}</h3>
        <p className="text-gray-400 text-sm">{new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-300 mt-2">{event.description.substring(0, 100)}...</p>
        <Link
        to={`/events/${event._id}`}
        className="block mt-3 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-md"
        >
        View Details
        </Link>
        </div>
    );
};

export default EventCard;
