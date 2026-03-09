const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  logFood,
  getDailyNutrition,
  searchFood
} = require("../controllers/foodController");


// Log food
router.post("/log", authMiddleware, logFood);

// Get today's nutrition summary
router.get("/today", authMiddleware, getDailyNutrition);

// Search food using Spoonacular API
router.get("/search", authMiddleware, searchFood);

module.exports = router;