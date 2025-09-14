const testAdmin = (req, res) => {
    res.json({
        message: "✅ Admin API Test working!",
        timestamp: new Date(),
    });
};

module.exports = {
    testAdmin,
};