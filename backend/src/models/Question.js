const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, "{PATH} must have 4 options"]
    },
    correctOption: { type: String, required: true },
    points: { type: Number, required: true } // points for this question
}, { timestamps: true });

// Custom validator to ensure exactly 4 options
function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model("Question", questionSchema);
