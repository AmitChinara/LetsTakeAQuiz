const express = require("express");
const adminController = require("../adminControllers");
const path = require('../constants/path');

const router = express.Router();

// Admin API test
router.get(path.TEST.API_CHECK, adminController.apiTestController.testAdmin);

// Admin DB check
router.get(path.TEST.DB_CHECK, adminController.dbTestController.dbCheck);

module.exports = router;
