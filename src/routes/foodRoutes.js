const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  logFood,
  getDailyNutrition
} = require("../controllers/foodController");

router.post("/log", authMiddleware, logFood);

router.get("/today", authMiddleware, getDailyNutrition);

module.exports = router;
