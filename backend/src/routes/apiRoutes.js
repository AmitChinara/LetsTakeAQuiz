const express = require("express");
const path = require('../constants/path');

const userRoutes = require("./userRoutes");
const gameRoutes = require("./gameRoutes");

const router = express.Router();

router.use(path.USER.BASE, userRoutes);
router.use(path.GAME.BASE, gameRoutes);

module.exports = router;
