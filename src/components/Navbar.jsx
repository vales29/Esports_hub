import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu toggle
import "./Navbar.css"; // Import futuristic styles

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
        <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
        eSports<span>HUB</span>
        </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
        <li><Link to="/videos" onClick={() => setMenuOpen(false)}>Videos</Link></li>
        <li><Link to="/community" onClick={() => setMenuOpen(false)}>Community</Link></li>
        <li><Link to="/organizer" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
        <li className="nav-btn">
        <Link to="/login" className="btn-neon" onClick={() => setMenuOpen(false)}>Login</Link>
        </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
        </div>
        </nav>
    );
};

export default Navbar;
