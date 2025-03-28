import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaYoutube, FaTwitch } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - 1; // Small offset to prevent rounding issues

            if (scrollPosition >= pageHeight) {
                setVisible(true);  // Show footer only when at the bottom
            } else {
                setVisible(false); // Hide footer when scrolling up
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <footer className={`footer ${visible ? "show" : ""}`} style={{ display: visible ? "block" : "none" }}>
            <div className="footer-content">
                <div className="footer-logo">eSports<span>HUB</span></div>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/videos">Videos</Link>
                    <Link to="/community">Community</Link>
                    <Link to="/privacy">Privacy</Link>
                </div>

                <div className="footer-social">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer"><FaTwitch /></a>
                </div>
            </div>

            {visible && (
                <div className="footer-copyright">
                    &copy; 2025 eSportsHUB. All rights reserved.
                </div>
            )}
        </footer>
    );
};

export default Footer;
