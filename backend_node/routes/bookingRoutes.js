const express = require("express");
const { createBooking, getMyBookings,  getAllBookings,
  updateBookingStatus, } = require("../controller/bookingController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware verification
if (typeof protect !== "function") {
  throw new Error("❌ protect middleware is not a function. Check authMiddleware.js");
}

// Booking routes
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
// ✅ Admin Routes
router.get("/all-bookings", protect, getAllBookings);
router.put("/update-booking/:id", protect, updateBookingStatus);

module.exports = router;