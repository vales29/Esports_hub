
import axios from "axios";

// Set up Axios instance with the backend URL
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    withCredentials: true, // Enables cookies for authentication
});

// Automatically add token to requests if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Authentication APIs
 */
export const loginUser = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    return data;
};

export const registerUser = async (userData) => {
    const { data } = await API.post("/api/auth/register", userData);
    localStorage.setItem("token", data.token);
    return data;
};

export const logoutUser = async () => {
    await API.post("/api/auth/logout");
    localStorage.removeItem("token");
};

/**
 * User APIs
 */
export const fetchUserProfile = async () => {
    const { data } = await API.get("/api/users/profile");
    return data;
};

export const updateUserProfile = async (userData) => {
    const { data } = await API.put("/api/users/profile", userData);
    return data;
};

/**
 * Events & Tournaments APIs
 */
export const fetchEvents = async () => {
    const { data } = await API.get("/api/events");
    return data;
};

export const fetchEventDetails = async (eventId) => {
    const { data } = await API.get(`/api/events/${eventId}`);
    return data;
};

export const registerForEvent = async (eventId) => {
    const { data } = await API.post(`/api/events/${eventId}/register`);
    return data;
};

export const createEvent = async (eventData) => {
    const { data } = await API.post("/api/events", eventData);
    return data;
};

/**
 * Chat & Community APIs
 */
export const fetchChatRooms = async () => {
    const { data } = await API.get("/api/chats");
    return data;
};

export const fetchMessages = async (roomId) => {
    const { data } = await API.get(`/api/chats/${roomId}/messages`);
    return data;
};

export const sendMessage = async (roomId, message) => {
    const { data } = await API.post(`/api/chats/${roomId}/messages`, { message });
    return data;
};

/**
 * Video Streaming APIs (For Event Videos)
 */
export const fetchVideos = async () => {
    const { data } = await API.get("/api/videos");
    return data;
};

export const fetchVideoDetails = async (videoId) => {
    const { data } = await API.get(`/api/videos/${videoId}`);
    return data;
};

/**
 * Organizer Dashboard APIs
 */
export const fetchOrganizerEvents = async () => {
    const { data } = await API.get("/api/organizer/events");
    return data;
};

export const updateEvent = async (eventId, eventData) => {
    const { data } = await API.put(`/api/events/${eventId}`, eventData);
    return data;
};

export const deleteEvent = async (eventId) => {
    await API.delete(`/api/events/${eventId}`);
};

/**
 * General API Test Function
 */
export const testAPIConnection = async () => {
    try {
        const { data } = await API.get("/");
        console.log("API Connected:", data);
    } catch (error) {
        console.error("API Connection Failed", error);
    }
};

export default API;
