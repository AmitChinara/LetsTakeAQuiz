import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH, VALUE } from "../config/config";
import { authAPI } from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Fetch logged-in user profile
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem(VALUE.TOKEN_KEY);
                if (!token) throw new Error("Not authenticated");

                const data = await authAPI.getProfile(token);
                setUser(data.user.username);
            } catch (err) {
                navigate(PATH.FRONTEND.LOGIN);
            }
        };
        fetchUser();
    }, [navigate]);

    const startNewGame = () => navigate(PATH.FRONTEND.GAME);
    const viewScoreboard = () => navigate(PATH.FRONTEND.SCOREBOARD);
    const logout = () => {
        localStorage.removeItem(VALUE.TOKEN_KEY);
        navigate(PATH.FRONTEND.LOGIN);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Welcome, {user || "Player"}!</h2>
                <div className="dashboard-buttons">
                    <button onClick={startNewGame}>Start New Game</button>
                    <button onClick={viewScoreboard}>View Scoreboard</button>
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
