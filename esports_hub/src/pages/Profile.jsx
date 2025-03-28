import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/api";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        bio: "",
        avatar: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/users/${user._id}`);
                setProfile(res.data);
                setFormData({
                    username: res.data.username,
                    email: res.data.email,
                    bio: res.data.bio || "",
                    avatar: res.data.avatar || "",
                });
            } catch (err) {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`/users/${user._id}`, formData);
            setProfile({ ...profile, ...formData });
            setEditing(false);
        } catch (err) {
            setError("Failed to update profile.");
        }
    };

    if (loading) return <p className="text-center text-gray-400">Loading profile...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
        </div>

        <div className="flex items-center space-x-6 mt-6">
        <img src={profile.avatar || "/default-avatar.png"} alt="Avatar" className="w-24 h-24 rounded-full" />
        {!editing ? (
            <div>
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            <p className="text-gray-400">{profile.email}</p>
            <p className="text-gray-300">{profile.bio || "No bio added yet."}</p>
            <button onClick={() => setEditing(true)} className="mt-2 px-4 py-1 bg-blue-600 rounded hover:bg-blue-700">Edit Profile</button>
            </div>
        ) : (
            <div className="flex flex-col space-y-2">
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="bg-gray-700 px-3 py-2 rounded text-white" />
            <input type="text" name="email" value={formData.email} disabled className="bg-gray-700 px-3 py-2 rounded text-white opacity-50 cursor-not-allowed" />
            <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Avatar URL" className="bg-gray-700 px-3 py-2 rounded text-white" />
            <textarea name="bio" value={formData.bio} onChange={handleChange} className="bg-gray-700 px-3 py-2 rounded text-white" placeholder="Write something about yourself..."></textarea>
            <button onClick={handleSave} className="px-4 py-1 bg-green-600 rounded hover:bg-green-700">Save</button>
            <button onClick={() => setEditing(false)} className="text-red-500 hover:underline">Cancel</button>
            </div>
        )}
        </div>

        {/* Registered Events */}
        <div className="mt-8">
        <h2 className="text-xl font-bold">Registered Events</h2>
        {profile.registeredEvents?.length === 0 ? (
            <p className="text-gray-400 mt-2">You haven't registered for any events yet.</p>
        ) : (
            <ul className="mt-4">
            {profile.registeredEvents.map((event) => (
                <li key={event._id} className="bg-gray-700 p-3 rounded mb-2">
                <Link to={`/events/${event._id}`} className="text-blue-400 hover:underline">{event.title}</Link>
                <p className="text-gray-400 text-sm">{new Date(event.date).toLocaleDateString()}</p>
                </li>
            ))}
            </ul>
        )}
        </div>
        </div>
        </div>
    );
};

export default Profile;
