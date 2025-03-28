import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css"; // Import futuristic styles

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", { email, password });
        // Add login logic here (API call, authentication, etc.)
    };

    return (
        <div className="login-container">
        <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Enter your credentials to access the eSports universe</p>

        <form onSubmit={handleSubmit} className="login-form">
        {/* Email Input */}
        <div className="input-group">
        <FaUser className="icon" />
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

        {/* Submit Button */}
        <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className="login-footer">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
        </div>
        </div>
        </div>
    );
};

export default Login;
