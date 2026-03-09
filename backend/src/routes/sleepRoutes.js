const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { logSleep } = require("../controllers/sleepController");

router.post("/log", protect, logSleep);

module.exports = router;
