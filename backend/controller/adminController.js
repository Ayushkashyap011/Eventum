const Booking = require("../models/Booking");
const User = require("../models/User");

// ✅ Get Dashboard Stats (Admin Only)
const getDashboardStats = async (req, res) => {
  try {
    console.log("🔍 Checking Admin User Object:", req.user);

    // Ensure only admins can access
    const adminUser = await User.findById(req.user?._id);
    if (!adminUser || !adminUser.isAdmin) {
      console.log("❌ Access denied. Not an admin or user not found!");
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only!",
      });
    }

    console.log("✅ Admin Verified:", adminUser.name);

    // Get dashboard stats using parallel queries
    const [totalUsers, totalBookings, revenueResult, latestBookings, recentUsers] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([{ $group: { _id: null, total: { $sum: { $ifNull: ["$amount", 0] } } } }]),
      Booking.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email"),
      User.find().select("name email createdAt").sort({ createdAt: -1 }).limit(5),
    ]);

    // Send response
    res.status(200).json({
      success: true,
      admin: {
        name: adminUser.name,
        email: adminUser.email,
      },
      stats: {
        totalUsers,
        totalBookings,
        totalRevenue: revenueResult[0]?.total || 0,
      },
      recentActivity: {
        bookings: latestBookings,
        users: recentUsers,
      },
    });
  } catch (error) {
    console.error("❌ Dashboard Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ✅ Get Total Users Count
const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ success: true, totalUsers });
  } catch (error) {
    console.error("❌ Error Fetching Users Count:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get Total Bookings Count
const getTotalBookings = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    res.status(200).json({ success: true, totalBookings });
  } catch (error) {
    console.error("❌ Error Fetching Bookings Count:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get All Users List (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email createdAt").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("❌ Error Fetching Users:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get All Bookings List (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("❌ Error Fetching Bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

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
  getDashboardStats,
  getTotalUsers,
  getTotalBookings,
  getAllUsers,
  getAllBookings,
  updateBookingStatus,
};
