import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [esports, setEsports] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/esports")
            .then(response => setEsports(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="landing-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Esports Hub</h1>
                    <p>Discover the latest esports events, videos, and more. Join the battle!</p>
                    <button className="cta-button">Join Now</button>
                </div>
            </section>

            <section className="features-section">
                <h2 className="section-title">Latest Esports Events</h2>
                <div className="features-grid">
                    {esports.map((item, index) => (
                        <div key={index} className="feature-card">
                            <img src={`http://localhost:5000/${item.image}`} alt={item.title} className="feature-image" />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 Esports Hub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
