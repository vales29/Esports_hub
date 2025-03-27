import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import VideoPage from "./pages/VideoPage";
import Community from "./pages/Community";
import OrganizerDashboard from "./pages/OrganizerDashboard";

const App = () => {
  return (
    <div className="app-container">
    <Navbar />
    <main className="main-content">
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/events" element={<Events />} />
    <Route path="/events/:id" element={<EventDetails />} />
    <Route path="/videos" element={<VideoPage />} />
    <Route path="/community" element={<Community />} />
    <Route path="/organizer" element={<OrganizerDashboard />} />
    </Routes>
    </main>
    <Footer />
    </div>
  );
};

export default App;
