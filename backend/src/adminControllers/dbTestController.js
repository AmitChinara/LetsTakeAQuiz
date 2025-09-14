const mongoose = require("mongoose");

const dbCheck = async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const dbName = mongoose.connection.name;

        res.json({
            message: "✅ MongoDB Connection Check",
            dbState,
            dbName,
        });
    } catch (err) {
        res.status(500).json({
            message: "❌ MongoDB Connection Error",
            error: err.message,
        });
    }
};

module.exports = {
    dbCheck,
}
