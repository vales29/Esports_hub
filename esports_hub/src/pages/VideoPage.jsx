import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";

const VideoPage = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await axios.get(`/videos/${videoId}`);
                setVideo(res.data);
                setLikes(res.data.likes);
                setComments(res.data.comments);
            } catch (err) {
                setError("Failed to load video.");
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedVideos = async () => {
            try {
                const res = await axios.get("/videos");
                setRelatedVideos(res.data.filter((vid) => vid._id !== videoId));
            } catch (err) {
                console.error("Failed to load related videos.");
            }
        };

        fetchVideo();
        fetchRelatedVideos();
    }, [videoId]);

    const handleLike = async () => {
        try {
            await axios.post(`/videos/${videoId}/like`);
            setLikes((prevLikes) => prevLikes + 1);
        } catch (err) {
            console.error("Failed to like the video.");
        }
    };

    const handleComment = async () => {
        if (!newComment.trim()) return;
        try {
            const res = await axios.post(`/videos/${videoId}/comment`, { text: newComment });
            setComments([...comments, res.data]);
            setNewComment("");
        } catch (err) {
            console.error("Failed to post comment.");
        }
    };

    if (loading) return <p className="text-center text-gray-400">Loading video...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-5xl mx-auto">
        {/* Video Player */}
        <div className="bg-black p-4 rounded-lg shadow-lg">
        <video controls className="w-full rounded">
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
        <p className="text-gray-400">{video.description}</p>
        <div className="flex items-center space-x-4 mt-2">
        <button onClick={handleLike} className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
        👍 {likes} Likes
        </button>
        <p className="text-gray-400">{video.views} Views</p>
        </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Comments</h2>
        <div className="flex items-center space-x-2 mt-3">
        <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="bg-gray-700 px-3 py-2 rounded text-white w-full"
        placeholder="Write a comment..."
        />
        <button onClick={handleComment} className="px-3 py-2 bg-green-600 rounded hover:bg-green-700">
        Post
        </button>
        </div>
        <ul className="mt-3">
        {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet.</p>
        ) : (
            comments.map((comment, index) => (
                <li key={index} className="bg-gray-700 p-3 rounded mb-2">
                <p>{comment.text}</p>
                </li>
            ))
        )}
        </ul>
        </div>

        {/* Related Videos */}
        <div className="mt-8">
        <h2 className="text-xl font-bold">Related Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {relatedVideos.map((vid) => (
            <div key={vid._id} className="bg-gray-800 p-3 rounded-lg">
            <a href={`/videos/${vid._id}`}>
            <img src={vid.thumbnailUrl} alt={vid.title} className="w-full rounded-md" />
            <h3 className="text-lg mt-2">{vid.title}</h3>
            </a>
            <p className="text-gray-400 text-sm">{vid.views} Views</p>
            </div>
        ))}
        </div>
        </div>
        </div>
        </div>
    );
};

export default VideoPage;
