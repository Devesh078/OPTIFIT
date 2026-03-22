const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { registerUser, loginUser } = require("../controllers/authController");
const { getProfile, updateProfile } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
=======

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
