const User = require("../models/User");
<<<<<<< HEAD
=======
const Calorie = require("../models/Calorie");
const Protein = require("../models/Protein");
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
const FoodLog = require("../models/FoodLog");
const WaterLog = require("../models/WaterLog");
const StepLog = require("../models/StepLog");
const Sleep = require("../models/Sleep");
const Recovery = require("../models/Recovery");
const ProteinQuality = require("../models/ProteinQuality");
const Workout = require("../models/Workout");

<<<<<<< HEAD
const {
  calculateDailyCalories,
  calculateProteinTarget
} = require("../services/calorieService");

const { calculateWaterGoal } =
require("../services/waterService");

const {
  DEFAULT_STEP_GOAL,
  calculateStepCalories
} = require("../services/stepService");


const getDashboard = async (req, res) => {
  try {

=======
const { calculateWaterGoal } =
require("../services/waterService");

const { DEFAULT_STEP_GOAL,
calculateStepCalories } =
require("../services/stepService");


const getDashboard =
async (req, res) =>
{
  try
  {
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
    const userId = req.user;

    const today = new Date();
    today.setHours(0,0,0,0);

<<<<<<< HEAD
    // USER
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 AUTO CALCULATED TARGETS
    const calorieData = calculateDailyCalories(user);
    const sleepData = await Sleep.findOne({
  userId,
  date: today
});

const sleepHours = sleepData?.sleepHours || 8;

const proteinTarget =
  calculateProteinTarget(user, sleepHours);

    // FOOD TOTALS
    const foods = await FoodLog.find({ userId, date: today });
=======

    // USER
    const user =
    await User.findById(userId)
    .select("-password");


    // CALORIES
    const calorie =
    await Calorie.findOne({
      userId,
      date: today
    });


    // PROTEIN TARGET
    const protein =
    await Protein.findOne({
      userId,
      date: today
    });


    // FOOD TOTALS
    const foods =
    await FoodLog.find({
      userId,
      date: today
    });
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089

    let consumedCalories = 0;
    let consumedProtein = 0;

<<<<<<< HEAD
    foods.forEach(f => {
=======
    foods.forEach(f =>
    {
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
      consumedCalories += f.calories || 0;
      consumedProtein += f.protein || 0;
    });

<<<<<<< HEAD
    // WORKOUT
    const workouts = await Workout.find({ userId, date: today });

    let burnedCalories = 0;

    workouts.forEach(w => {
      burnedCalories += w.caloriesBurned || 0;
    });

    // STEPS
    const stepLog = await StepLog.findOne({ userId, date: today });

    const steps = stepLog?.steps || 0;
    const stepCalories = calculateStepCalories(steps);

    // WATER
    const waterLogs = await WaterLog.find({ userId, date: today });

    let waterConsumed = 0;

    waterLogs.forEach(w => {
      waterConsumed += w.amount;
    });

    const waterGoal = calculateWaterGoal(user.weight);

    // SLEEP
    const sleep = await Sleep.findOne({ userId, date: today });

    // RECOVERY
    const recovery = await Recovery.findOne({ userId, date: today });

    // PROTEIN QUALITY
    const proteinQuality = await ProteinQuality.findOne({ userId, date: today });
=======

    // WORKOUT
    const workouts =
    await Workout.find({
      userId,
      date: today
    });

    let burnedCalories = 0;

    workouts.forEach(w =>
    burnedCalories += w.caloriesBurned || 0
    );


    // WATER
    const waterLogs =
    await WaterLog.find({
      userId,
      date: today
    });

    let waterConsumed = 0;

    waterLogs.forEach(w =>
    waterConsumed += w.amount
    );

    const waterGoal =
    calculateWaterGoal(user.weight);


    // STEPS
    const stepLog =
    await StepLog.findOne({
      userId,
      date: today
    });

    const steps =
    stepLog?.steps || 0;

    const stepCalories =
    calculateStepCalories(steps);


    // SLEEP
    const sleep =
    await Sleep.findOne({
      userId,
      date: today
    });


    // RECOVERY
    const recovery =
    await Recovery.findOne({
      userId,
      date: today
    });


    // PROTEIN QUALITY
    const proteinQuality =
    await ProteinQuality.findOne({
      userId,
      date: today
    });

>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089

    res.json({

      user,

<<<<<<< HEAD
      calories: {
        target: calorieData.finalCalories,
        consumed: consumedCalories,
        burned: burnedCalories + stepCalories,
        remaining:
          calorieData.finalCalories
          - consumedCalories
          + burnedCalories
          + stepCalories
      },

      protein: {
        target: proteinTarget,
        consumed: consumedProtein,
        remaining:
          proteinTarget - consumedProtein
      },

      water: {
        goal: waterGoal,
        consumed: waterConsumed,
        remaining:
          waterGoal - waterConsumed
      },

      steps: {
=======
      calories:
      {
        target:
        calorie?.finalCalories || 0,

        consumed:
        consumedCalories,

        burned:
        burnedCalories,

        remaining:
        (calorie?.finalCalories || 0)
        - consumedCalories
        + burnedCalories
      },

      protein:
      {
        target:
        protein?.adjustedProtein || 0,

        consumed:
        consumedProtein,

        remaining:
        (protein?.adjustedProtein || 0)
        - consumedProtein
      },

      water:
      {
        goal: waterGoal,
        consumed: waterConsumed,
        remaining:
        waterGoal - waterConsumed
      },

      steps:
      {
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
        goal: DEFAULT_STEP_GOAL,
        steps,
        caloriesBurned: stepCalories,
        remaining:
<<<<<<< HEAD
          DEFAULT_STEP_GOAL - steps
      },

      sleep,
      recovery,
      proteinQuality,

      workout: {
        caloriesBurned: burnedCalories
=======
        DEFAULT_STEP_GOAL - steps
      },

      sleep,

      recovery,

      proteinQuality,

      workout:
      {
        caloriesBurned:
        burnedCalories
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
      }

    });

<<<<<<< HEAD
  } catch (error) {
    console.log(error);
    res.status(500).json({
=======
  }
  catch(error)
  {
    console.log(error);

    res.status(500)
    .json({
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
      message: "Server error"
    });
  }
};

<<<<<<< HEAD
module.exports = { getDashboard };
=======
module.exports =
{
getDashboard
};
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
