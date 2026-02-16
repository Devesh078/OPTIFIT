const calculateBMR = (weight, height, age) => {
  return 10 * weight + 6.25 * height - 5 * age + 5;
};

const getActivityMultiplier = (activityLevel) => {
  switch (activityLevel) {
    case "sedentary":
      return 1.2;
    case "moderate":
      return 1.55;
    case "active":
      return 1.75;
    default:
      return 1.55;
  }
};

const getGoalAdjustment = (goal) => {
  switch (goal) {
    case "muscle_build":
      return 300;
    case "weight_loss":
      return -300;
    default:
      return 0;
  }
};

const calculateDailyCalories = (user) => {
  const bmr = calculateBMR(user.weight, user.height, user.age);
  const tdee = bmr * getActivityMultiplier(user.activityLevel);
  const finalCalories = Math.round(tdee + getGoalAdjustment(user.goal));

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    finalCalories
  };
};

module.exports = { calculateDailyCalories };
