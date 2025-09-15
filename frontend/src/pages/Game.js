import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameAPI } from "../services/api";
import { PATH } from "../config/config";
import "./Game.css";

const Game = () => {
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState("");
    const [nameSubmitted, setNameSubmitted] = useState(false);

    const [gameId, setGameId] = useState(null);
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [totalPoints, setTotalPoints] = useState(0);
    const [winner, setWinner] = useState(false);
    const [quit, setQuit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");

    // Start new game after name is submitted
    useEffect(() => {
        if (!nameSubmitted) return;

        const startGame = async () => {
            try {
                setLoading(true);
                const res = await gameAPI.startGame(playerName);
                setGameId(res.gameId);
                setQuestion(res.nextQuestion);
                setTotalPoints(0);
                setWinner(false);
                setQuit(false);
                setCorrectAnswer("");
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        startGame();
    }, [nameSubmitted, playerName]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmitAnswer = async () => {
        if (!selectedOption || !question) return;
        try {
            setLoading(true);
            const res = await gameAPI.submitAnswer(gameId, question._id, selectedOption);

            setTotalPoints(res.totalPoints);
            setWinner(res.winner);

            if (res.isCorrect === false && res.correctOption) {
                setCorrectAnswer(res.correctOption);
            }

            if (res.nextQuestion) {
                setQuestion(res.nextQuestion);
                setSelectedOption("");
            } else {
                setQuestion(null); // game over
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuit = async () => {
        try {
            if (gameId) {
                await gameAPI.quitGame(gameId);
            }
        } catch (err) {
            console.error("Quit failed:", err);
        }
        setQuit(true);
        setQuestion(null); // end game immediately
    };

    if (loading) return <p>Loading...</p>;

    // Show player name input before game starts
    if (!nameSubmitted) {
        return (
            <div className="game-container">
                <h2 className="welcome-title">Enter Your Name to Start</h2>
                <div className="name-form">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="name-input"
                    />
                    <button
                        onClick={() => playerName.trim() && setNameSubmitted(true)}
                        disabled={!playerName.trim()}
                        className="start-btn"
                    >
                        Start Game
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="game-container">
            <h2>Quiz Game</h2>
            <p>Player: {playerName}</p>
            {question && <p>Total Points: {totalPoints}</p>}

            {question ? (
                <>
                    {/* Quit button pinned at top-left */}
                    <button className="quit-btn top-left" onClick={handleQuit}>
                        Quit Game
                    </button>

                    <div className="question-card">
                        <h3>Level {question.level}</h3>
                        <p>{question.questionText}</p>
                        <div className="options">
                            {question.options.map((opt) => (
                                <button
                                    key={opt}
                                    className={selectedOption === opt ? "selected" : ""}
                                    onClick={() => handleOptionSelect(opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        <button
                            className="submit-btn"
                            onClick={handleSubmitAnswer}
                            disabled={!selectedOption}
                        >
                            Submit Answer
                        </button>
                    </div>
                </>
            ) : (
                <div className="game-over">
                    {winner ? (
                        <>
                            <h3>🎉 Congo!! You are a Crorepati(In Knowledge Only)!</h3>
                            <p>Total Points: {totalPoints}</p>
                        </>
                    ) : quit ? (
                        <>
                            <h3>😜 You quit... couldn’t handle the pressure?</h3>
                            <p>Total Points: {totalPoints}</p>
                        </>
                    ) : (
                        <>
                            <h3>❌ Sorry!! The Answer was wrong</h3>
                            {correctAnswer && <p>✅ Correct Answer: {correctAnswer}</p>}
                            {totalPoints !== 0 && <p>As you gave wrong answer point reduced to half.</p>}
                            <p>Total Points: {Math.floor(totalPoints / 2)}</p>
                        </>
                    )}
                    <button onClick={() => navigate(PATH.FRONTEND.DASHBOARD)}>
                        Back to Dashboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default Game;
