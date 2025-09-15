const express = require("express");
const { userController } = require("../controllers");
const path = require('../constants/path');

const router = express.Router();

// Routes
router.post(path.USER.SIGNUP, userController.signup);
router.post(path.USER.LOGIN, userController.login);

module.exports = router;
