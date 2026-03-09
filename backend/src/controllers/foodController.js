/*const FoodLog = require("../models/FoodLog");
const { calculateDailyTotals } = require("../services/nutritionService");

const logFood = async (req, res) =>
{
  try
  {
    const today = new Date();
    today.setHours(0,0,0,0);

    const food = await FoodLog.create({
      userId: req.user,
      date: today,
      ...req.body
    });

    res.status(201).json(food);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getDailyNutrition = async (req, res) =>
{
  try
  {
    const today = new Date();
    today.setHours(0,0,0,0);

    const totals = await calculateDailyTotals(req.user, today);

    res.json(totals);
  }
  catch(error)
  {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports =
{
  logFood,
  getDailyNutrition
};
*/

const FoodLog = require("../models/FoodLog");
const { calculateDailyTotals } = require("../services/nutritionService");
const foodService = require("../services/foodService");
const indianFoods = require("../data/indianFoods.json");


// Log food
const logFood = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0,0,0,0);

    const food = await FoodLog.create({
      userId: req.user,
      date: today,
      ...req.body
    });

    res.status(201).json(food);

  } catch(error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }
};


// Get today's nutrition totals
const getDailyNutrition = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0,0,0,0);

    const totals = await calculateDailyTotals(req.user, today);

    res.json(totals);

  } catch(error) {

    res.status(500).json({ message: "Server error" });

  }
};


// Search food
const searchFood = async (req, res) => {
  try {

    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Food query is required" });
    }

    const query = q.toLowerCase();

    // Check local Indian foods first
    if (indianFoods[query]) {
      return res.json({
        success: true,
        source: "local",
        foods: [
          {
            name: query,
            ...indianFoods[query]
          }
        ]
      });
    }

    // Otherwise use Spoonacular API
    const foodData = await foodService.searchFood(query);

    const foods = foodData.results.map(food => ({
      id: food.id,
      name: food.name,
      image: food.image
    }));

    res.json({
      success: true,
      source: "spoonacular",
      foods
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Food search failed"
    });

  }
};


module.exports = {
  logFood,
  getDailyNutrition,
  searchFood
};