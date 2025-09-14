const { Game, Question } = require("../models");
require("dotenv").config();

// Start a new game session
const startNewGame = async (userId, playerName) => {

    const game = new Game({
        user: userId,
        playerName,
        currentQuestionIndex: 0, // corresponds to level 1
        totalPoints: 0,
        winner: false,
        answers: [],
    });

    await game.save();
    return game;
};

// Get next question for a game
const getNextQuestion = async (gameId) => {
    const game = await Game.findById(gameId);
    if (!game) throw new Error("Game not found");

    const currentLevel = game.currentQuestionIndex + 1; // 1-based level
    const questions = await Question.find({ level: currentLevel });

    if (!questions.length) throw new Error(`No questions for level ${currentLevel}`);

    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
};

// Submit answer for the current question
const submitAnswerToGame = async (gameId, questionId, selectedOption) => {
    const totalLevels = parseInt(process.env.TOTAL_LEVELS) || 15;
    const totalPoints = parseInt(process.env.TOTAL_POINTS) || 100;
    const pointDistribution = (process.env.POINTS_DISTRIBUTION).split(',').map(Number);

    const game = await Game.findById(gameId);
    if (!game) throw new Error("Game not found");

    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const isCorrect = question.correctOption === selectedOption;

    const pointsEarned = isCorrect ? totalPoints * pointDistribution[game.currentQuestionIndex] : 0;

    game.answers.push({
        question: questionId,
        selectedOption,
        isCorrect,
        pointsEarned,
    });

    game.totalPoints += isCorrect ? pointsEarned : -Math.floor(game.totalPoints / 2);
    game.currentQuestionIndex += 1;

    // Mark winner if last level answered correctly
    if (game.currentQuestionIndex === totalLevels && isCorrect) {
        game.winner = true;
    }

    game.updatedAt = new Date();
    await game.save();


    // Return next question or null if game over
    const nextQuestion =
        game.currentQuestionIndex < totalLevels && isCorrect
            ? await getNextQuestion(game._id)
            : null;

    return {
        isCorrect,
        pointsEarned,
        totalPoints: game.totalPoints,
        winner: game.winner,
        nextQuestion,
    };
};

const quitGame = async (gameId) => {
    const game = await Game.findById(gameId);
    if (!game) throw new Error("Game not found");

    const { isCorrect, pointsEarned, nextQuestion } = { isCorrect:false, pointsEarned: 0, getNextQuestion: null };

    game.quit = true;
    game.updatedAt = new Date();
    await game.save();

    return {
        isCorrect,
        pointsEarned,
        totalPoints: game.totalPoints,
        winner: game.winner,
        nextQuestion,
    };
}

// Get user's personal scoreboard
const getUserScoreboard = async (userId) => {
    const games = await Game.find({ user: userId }).sort({ createdAt: -1 });
    return games.map((game) => ({
        playerName: game.playerName,
        totalPoints: game.totalPoints,
        winner: game.winner,
        quit: game.quit,
        createdAt: game.createdAt,
    }));
};

module.exports = {
    startNewGame,
    getNextQuestion,
    submitAnswerToGame,
    quitGame,
    getUserScoreboard,
};
