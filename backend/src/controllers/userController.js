const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Signup
const signup = async (req, res) => {
    console.log("Signup Controller Called");
    try {
        const { username, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new models.User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User created ✅", userId: user._id, token });
    } catch (err) {
        if (err.message.includes("duplicate key error")) {
            return res.status(400).json({ error: "Username already exists" });
        }
        res.status(500).json({ error: err.message });
    }
};

// Login
const login = async (req, res) => {
    console.log("Login Controller Called");
    try {
        const { username, password } = req.body;
        const user = await models.User.findOne({ username });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res
            .cookie("token", token, {
                httpOnly: true,      // prevents JS access to the cookie
                secure: process.env.NODE_ENV === "production", // only HTTPS in prod
                maxAge: 3600000       // 1 hour
            })
            .json({ message: "Login successful ✅", user: { id: user._id, username: user.username, token } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const profile = async (req, res) => {
    console.log("Profile Controller Called");
    try {
        if (!req.user) return res.status(401).json({ error: "Unauthorized" });
        res.json({ user: { username: req.user.username, _id: req.user._id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { signup, login, profile };
