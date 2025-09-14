const express = require("express");
const adminController = require("../adminControllers");

const router = express.Router();

// Admin API test
router.get("/apicheck", adminController.apiTestController.testAdmin);

// Admin DB check
router.get("/dbcheck", adminController.dbTestController.dbCheck);

module.exports = router;
