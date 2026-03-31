const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { logSleep, getTodaySleep } = require("../controllers/sleepController");

const protect = require("../middleware/authMiddleware");


router.post("/log", protect, logSleep);
router.post("/", protect, logSleep);
router.get("/today", protect, getTodaySleep);
=======

const protect = require("../middleware/authMiddleware");
const { logSleep } = require("../controllers/sleepController");

router.post("/log", protect, logSleep);

>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
module.exports = router;
