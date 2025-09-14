const express = require("express");
const path = require('../constants/path');

const userRoutes = require("./userRoutes");

const router = express.Router();

router.use(path.USER.BASE, userRoutes);

module.exports = router;
