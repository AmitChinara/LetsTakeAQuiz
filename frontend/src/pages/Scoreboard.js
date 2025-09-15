// src/pages/Scoreboard.js

import React, { useEffect, useState } from "react";
import { gameAPI } from "../services/api";
import "./Scoreboard.css";

const Scoreboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchScoreboard = async () => {
            try {
                const res = await gameAPI.getScoreboard();
                setScores(res.scoreboard); // keep server order
            } catch (err) {
                console.error("Failed to fetch scoreboard", err);
            } finally {
                setLoading(false);
            }
        };

        fetchScoreboard();
    }, []);

    if (loading) return <p>Loading scoreboard...</p>;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentScores = scores.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(scores.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div className="scoreboard-container">
            <h2>Scoreboard 🏆</h2>
            <table className="scoreboard-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Points</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {currentScores.map((item, idx) => (
                    <tr key={idx} className={item.winner ? "winner-row" : item.quit ? "quit-row" : ""}>
                        <td>{indexOfFirstItem + idx + 1}</td>
                        <td>{item.playerName}</td>
                        <td>{item.totalPoints.toLocaleString()}</td>
                        <td>
                            {item.winner && <span className="icon crown">👑 Winner</span>}
                            {!item.winner && !item.quit && <span className="icon thumb">👍 You can do it</span>}
                            {item.quit && <span className="icon tease">💀 Quitter</span>}
                        </td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Scoreboard;
