const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    playerName: { type: String, required: true },
    currentQuestionIndex: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    answers: [
        {
            question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
            selectedOption: String,
            isCorrect: Boolean,
            pointsEarned: Number
        }
    ],
    winner: { type: Boolean, default: false }, // true if all 15 questions correctgame.updatedAt = new Date();
    quit: { type: Boolean, default: false }, // true if user quit the game
}, { timestamps: true });

module.exports = mongoose.model("Game", gameSchema);
