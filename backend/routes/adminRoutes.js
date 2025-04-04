const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getDashboardStats,
  getTotalUsers,
  getTotalBookings,
  getAllUsers,
  getAllBookings,
  updateBookingStatus
} = require("../controller/adminController");

const router = express.Router();

// ✅ Ensure middleware is properly loaded
if (typeof protect !== "function") {
  throw new Error("❌ protect middleware is not a function. Check authMiddleware.js");
}

// ✅ Admin routes
router.get("/dashboard-stats", protect, getDashboardStats);
router.get("/total-users", protect, getTotalUsers);
router.get("/total-bookings", protect, getTotalBookings);
router.get("/all-users", protect, getAllUsers);
router.get("/all-bookings", protect, getAllBookings);
router.put("/update-booking/:id", protect, updateBookingStatus);

module.exports = router;
