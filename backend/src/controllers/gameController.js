// controllers/gameController.js
const gameService = require("../services/gameService");

// Start a new game session
const startGame = async (req, res) => {
    try {
        const { playerName } = req.body;
        const userId = req.user._id; // auth middleware should set this

        const game = await gameService.startNewGame(userId, playerName);
        const nextQuestion = await gameService.getNextQuestion(game._id);

        res.status(201).json({
            message: "Game started ✅",
            gameId: game._id,
            nextQuestion
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Submit an answer for the current question
const submitAnswer = async (req, res) => {
    try {
        const { gameId, questionId, selectedOption } = req.body;

        const result = await gameService.submitAnswerToGame(
            gameId,
            questionId,
            selectedOption
        );

        res.json({
            message: "Answer submitted ✅",
            ...result
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get the user's personal scoreboard
const getScoreboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const scoreboard = await gameService.getUserScoreboard(userId);

        res.json({ scoreboard });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    startGame,
    submitAnswer,
    getScoreboard
};
