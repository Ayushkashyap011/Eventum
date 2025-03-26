const express = require("express");
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create a Booking
router.post("/", protect, async (req, res) => {
  try {
    const { eventDate, eventPlan, eventDetails, budget } = req.body;

    if (!eventDate || !eventPlan || !eventDetails || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User authentication failed" });
    }

    const booking = new Booking({
      user: req.user.id, // Ensure user ID is stored
      eventDate,
      eventPlan,
      eventDetails,
      budget,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🟢 Get My Bookings (Protected Route)
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;