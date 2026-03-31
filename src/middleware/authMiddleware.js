const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const User = require("../models/User");

const protect = async (req, res, next) => {

=======

const protect = (req, res, next) => {
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
<<<<<<< HEAD

    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from database
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;   // ✅ attach full user

      next();

    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }

=======
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
<<<<<<< HEAD

};

module.exports = protect;
=======
};

module.exports = protect;
>>>>>>> 0303ee4b5731e0cea6cc5bdb2f10fe0fa642f089
