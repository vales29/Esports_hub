import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";  // ✅ Import the Terms Page
import Community from './pages/Community';
import Event from './pages/Events';
import Videos from './pages/Videos';
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />  {/* ✅ Add this line */}
          <Route path="/community" element={<Community />} />
          <Route path="/Events" element={<Event />} />
          <Route path="/Videos" element={<Videos />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};



export default App;
