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

export default Login;import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);

            // Redirect based on role
            if (user?.role === "organizer") {
                navigate("/organizer-dashboard");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login-container">
        <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Enter your credentials to access the eSports universe</p>

        <form onSubmit={handleSubmit} className="login-form">
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

        <button type="submit" className="login-btn">Log In</button>
        </form>
        </div>
        </div>
    );
};

export default Login;
