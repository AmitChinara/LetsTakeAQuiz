const express = require("express");
const { userController } = require("../controllers");
const path = require('../constants/path');
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Routes
router.post(path.USER.SIGNUP, userController.signup);
router.post(path.USER.LOGIN, userController.login);
router.get(path.USER.PROFILE, authMiddleware, userController.profile);

module.exports = router;
