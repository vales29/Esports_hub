import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css"; // Import futuristic styles

const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-container">
        {/* Logo & Description */}
        <div className="footer-section">
        <h2 className="footer-logo">eSports<span>HUB</span></h2>
        <p className="footer-text">
        The ultimate battleground for gamers. Join tournaments, stream matches, and connect with the esports community.
        </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
        <h3>Explore</h3>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><Link to="/community">Community</Link></li>
        </ul>
        </div>

        {/* Support Links */}
        <div className="footer-section">
        <h3>Support</h3>
        <ul>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms">Terms of Service</Link></li>
        </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon" /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="social-icon" /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon" /></a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className="social-icon" /></a>
        </div>
        </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
        &copy; {new Date().getFullYear()} eSportsHUB. All rights reserved.
        </div>
        </footer>
    );
};

export default Footer;
