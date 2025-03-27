import { useEffect, useState } from "react";
import axios from "../utils/api";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsRes = await axios.get("/events/latest");
                const videosRes = await axios.get("/videos/latest");

                setEvents(eventsRes.data || []); // Ensure it doesn't break if empty
                setVideos(videosRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
        <h1>Welcome to Esports Hub</h1>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <>
            <section>
            <h2>Latest Events</h2>
            {events.length > 0 ? (
                events.map((event) => <p key={event._id}>{event.title}</p>)
            ) : (
                <p>No events available. Stay tuned for upcoming tournaments!</p>
            )}
            </section>

            <section>
            <h2>Latest Videos</h2>
            {videos.length > 0 ? (
                videos.map((video) => <p key={video._id}>{video.title}</p>)
            ) : (
                <p>No videos uploaded yet. Check back later!</p>
            )}
            </section>
            </>
        )}
        </div>
    );
};

export default Home;
