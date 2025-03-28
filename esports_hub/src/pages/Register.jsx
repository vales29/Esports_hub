import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGamepad, FaBriefcase } from "react-icons/fa";
import "./Register.css"; // Import futuristic styles

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("gamer"); // Default role: Gamer
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { username, email, password, role };

        console.log("Registering:", userData);
        // Here, send `userData` to backend API (POST request)

        // Simulate API response
        setTimeout(() => {
            console.log("User registered successfully!");
            navigate("/login"); // Redirect to login page after registration
        }, 1000);
    };

    return (
        <div className="register-container">
        <div className="register-box">
        <h2 className="register-title">Join the eSports Universe</h2>
        <p className="register-subtitle">Choose your role and start your journey</p>

        <form onSubmit={handleSubmit} className="register-form">
        {/* Username Input */}
        <div className="input-group">
        <FaUser className="icon" />
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        </div>

        {/* Email Input */}
        <div className="input-group">
        <FaEnvelope className="icon" />
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        </div>

        {/* Password Input */}
        <div className="input-group">
        <FaLock className="icon" />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        </div>

        {/* Role Selection */}
        <div className="role-selection">
        <label className={role === "gamer" ? "role-active" : ""}>
        <input
        type="radio"
        name="role"
        value="gamer"
        checked={role === "gamer"}
        onChange={() => setRole("gamer")}
        />
        <FaGamepad className="role-icon" /> Gamer
        </label>

        <label className={role === "organizer" ? "role-active" : ""}>
        <input
        type="radio"
        name="role"
        value="organizer"
        checked={role === "organizer"}
        onChange={() => setRole("organizer")}
        />
        <FaBriefcase className="role-icon" /> Organizer
        </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="register-btn">Register</button>
        </form>

        <div className="register-footer">
        <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
        </div>
        </div>
    );
};

export default Register;
