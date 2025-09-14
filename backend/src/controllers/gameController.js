const { gameService } = require("../services");

// Start a new game session
const startGame = async (req, res) => {
    try {
        const { userId, playerName } = req.body;
        const game = await gameService.startNewGame(userId, playerName);
        res.json({ message: "Game started ✅", game });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Submit an answer for the current question
const submitAnswer = async (req, res) => {
    try {
        const { gameId, questionId, answer } = req.body;
        const result = await gameService.submitAnswerToGame(gameId, questionId, answer);
        res.json({ message: "Answer submitted ✅", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get the user's personal scoreboard
const getScoreboard = async (req, res) => {
    try {
        const { userId } = req.params;
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
