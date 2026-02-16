const FoodLog = require("../models/FoodLog");
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
