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
                setScores(res.scoreboard);
            } catch (err) {
                console.error("Failed to fetch scoreboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchScoreboard();
    }, []);

    if (loading) return <p>Loading scoreboard...</p>;

    const totalPages = Math.ceil(scores.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentScores = scores.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Smart pagination buttons
    const renderPageButtons = () => {
        const buttons = [];

        // Always show first page
        if (currentPage > 3) {
            buttons.push(
                <button key={1} onClick={() => handlePageChange(1)}>
                    1
                </button>
            );
            buttons.push(<span key="start-ellipsis"> ... </span>);
        }

        // Show current page ±1
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i < 1 || i > totalPages) continue;
            buttons.push(
                <button
                    key={i}
                    className={currentPage === i ? "active" : ""}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        // Always show last page
        if (currentPage < totalPages - 2) {
            buttons.push(<span key="end-ellipsis"> ... </span>);
            buttons.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return buttons;
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

            {/* Pagination without Next/Prev */}
            <div className="pagination">{renderPageButtons()}</div>
        </div>
    );
};

export default Scoreboard;
