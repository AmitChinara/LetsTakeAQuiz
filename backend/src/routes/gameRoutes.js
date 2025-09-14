const express = require("express");
const path = require("../constants/path");
const { gameController } = require("../controllers");
const authMiddleware = require("../middleware/auth"); // <-- add your auth middleware

const router = express.Router();

// All game routes require authentication
router.post(path.GAME.START, authMiddleware, gameController.startGame);
router.post(path.GAME.SUBMIT, authMiddleware, gameController.submitAnswer);
router.get(path.GAME.SCOREBOARD, authMiddleware, gameController.getScoreboard);
router.post(path.GAME.QUIT, authMiddleware, gameController.quitGame);

module.exports = router;
