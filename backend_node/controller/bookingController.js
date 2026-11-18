const Booking = require("../models/Booking");

// ✅ Create a New Booking
const createBooking = async (req, res) => {
  try {
    const { eventDate, eventPlan, eventDetails, budget } = req.body;

    // Validation
    if (!eventDate || !eventPlan || !eventDetails || !budget) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    // Create new booking
    const booking = new Booking({
      user: req.user.id,
      eventDate,
      eventPlan,
      eventDetails,
      budget,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: booking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Get User Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Get All Bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email phone password");

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Update Booking Status (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Done", "Cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: Pending, Done, Cancelled",
      });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
