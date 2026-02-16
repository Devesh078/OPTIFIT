const FoodLog = require("../models/FoodLog");

const calculateDailyTotals = async (userId, date) =>
{
  const logs = await FoodLog.find({ userId, date });

  const totals =
  {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    potassium: 0
  };

  logs.forEach(log =>
  {
    totals.calories += log.calories || 0;
    totals.protein += log.protein || 0;
    totals.carbs += log.carbs || 0;
    totals.fats += log.fats || 0;
    totals.fiber += log.fiber || 0;
    totals.sugar += log.sugar || 0;
    totals.sodium += log.sodium || 0;
    totals.potassium += log.potassium || 0;
  });

  return totals;
};

module.exports = { calculateDailyTotals };
