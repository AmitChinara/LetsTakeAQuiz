// middleware/auth.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token; // get from cookie
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authMiddleware;
