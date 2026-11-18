const express = require("express");
const { 
  signup, 
  login, 
  getProfile, 
  updateProfile 
} = require("../controller/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware verification
if (typeof protect !== "function") {
  throw new Error("❌ protect middleware is not a function. Check authMiddleware.js");
}

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/update", protect, updateProfile);

module.exports = router;