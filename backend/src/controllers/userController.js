const { userService } = require("../services");

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.signupUser(username, password);
        res.json({ message: "User created ✅", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.loginUser(username, password);
        res.json({ message: "Login successful ✅", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    signup,
    login
};
