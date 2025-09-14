const { Game, Question, User } = require("../models");

// Start a new game session
const startNewGame = async (userId, playerName) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Create a new game session
    const game = new Game({
        user: userId,
        playerName,
        currentQuestionIndex: 0,
        totalPoints: 0,
        answers: [],
        winner: false
    });

    await game.save();
    return game;
};

// Submit an answer for the current question
const submitAnswerToGame = async (gameId, questionId, selectedOption) => {
    const game = await Game.findById(gameId);
    if (!game) throw new Error("Game not found");

    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    // Check if answer is correct
    const isCorrect = question.correctOption === selectedOption;

    // Calculate points
    let pointsEarned = isCorrect ? question.points : Math.floor(game.totalPoints / 2);

    // Update game
    game.answers.push({
        question: questionId,
        selectedOption,
        isCorrect,
        pointsEarned
    });

    game.totalPoints += pointsEarned;
    game.currentQuestionIndex += 1;

    // Mark winner if last question answered correctly
    if (game.currentQuestionIndex === 15 && isCorrect) {
        game.winner = true;
    }

    game.updatedAt = new Date();
    await game.save();

    return {
        isCorrect,
        pointsEarned,
        totalPoints: game.totalPoints,
        winner: game.winner
    };
};

// Get user's personal scoreboard
const getUserScoreboard = async (userId) => {
    const games = await Game.find({ user: userId }).sort({ createdAt: -1 });
    return games.map(game => ({
        playerName: game.playerName,
        totalPoints: game.totalPoints,
        winner: game.winner,
        createdAt: game.createdAt
    }));
};

module.exports = {
    startNewGame,
    submitAnswerToGame,
    getUserScoreboard
};
