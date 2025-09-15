import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <h1>Welcome to Dashboard 🎉</h1>
            <Link to="/game">Start Game</Link>
        </div>
    );
}
