const express = require("express");
const path = require('../constants/path');

const { gameController } = require("../controllers");

const router = express.Router();

// Start a new game session
router.post(path.GAME.START, gameController.startGame);

// Submit an answer for a question
router.post(path.GAME.SUBMIT, gameController.submitAnswer);

// Get user's personal scoreboard
router.get(path.GAME.SCOREBOARD, gameController.getScoreboard);

module.exports = router;
