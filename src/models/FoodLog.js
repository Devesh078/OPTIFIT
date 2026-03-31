const mongoose = require("mongoose");

const foodLogSchema = new mongoose.Schema(
{
  userId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date:
  {
    type: Date,
    required: true
  },

  foodName:
  {
    type: String,
    required: true
  },

  quantity:
  {
    type: Number,
    required: true
  },
<<<<<<< HEAD
  unit:
{
  type: String,
  required: true
},
=======

>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
  calories: Number,

  protein: Number,
  carbs: Number,
  fats: Number,
  fiber: Number,
  sugar: Number,

  saturatedFat: Number,
  polyunsaturatedFat: Number,
  monounsaturatedFat: Number,
  transFat: Number,

  cholesterol: Number,

  sodium: Number,
  potassium: Number,

  vitaminA: Number,
  vitaminC: Number,

  calcium: Number,
  iron: Number

},
{ timestamps: true }
);

module.exports = mongoose.model("FoodLog", foodLogSchema);
