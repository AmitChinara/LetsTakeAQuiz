import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import { PATH, VALUE } from "../config/config";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await authAPI.login(username, password);

            // Save token if returned
            if (res.user.token) {
                localStorage.setItem(VALUE.TOKEN_KEY, res.user.token);
            }

            navigate(PATH.FRONTEND.DASHBOARD);
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="toggle-eye"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>
                Don't have an account? <Link to={PATH.FRONTEND.SIGNUP}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
