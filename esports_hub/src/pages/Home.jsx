import { Trophy, Video, Users } from "lucide-react";
import "./Home.css";

const Home = () => {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Esports Hub</h1>
                    <p>Discover the latest esports events, videos, and more. Join the battle!</p>
                    <button className="cta-button">Join Now</button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <Trophy className="feature-icon" />
                        <h3>Competitions</h3>
                        <p>Explore the biggest esports tournaments worldwide.</p>
                    </div>
                    <div className="feature-card">
                        <Video className="feature-icon" />
                        <h3>Videos</h3>
                        <p>Watch live streams and highlights from top games.</p>
                    </div>
                    <div className="feature-card">
                        <Users className="feature-icon" />
                        <h3>Community</h3>
                        <p>Join a vibrant community of esports fans and players.</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Dive In?</h2>
                    <p>Start your esports journey with us and be part of the action.</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 Esports Hub. All rights reserved.</p>
                    <div className="social-icons">
                        <a href="#" target="_blank">Facebook</a>
                        <a href="#" target="_blank">Twitter</a>
                        <a href="#" target="_blank">Instagram</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
