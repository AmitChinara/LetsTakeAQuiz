const { User } = require("../models");
const bcrypt = require("bcrypt");

// Signup logic
const signupUser = async (username, password) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    return user;
};

// Login logic
const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Invalid credentials");

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return user;
};

module.exports = {
    signupUser,
    loginUser
};
