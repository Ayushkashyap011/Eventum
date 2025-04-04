const express = require("express");  // Import Express framework
const dotenv = require("dotenv");    // Load environment variables
const cors = require("cors");        // Allow frontend-backend communication
const mongoose = require("mongoose"); // Import Mongoose for MongoDB
const cookieParser = require("cookie-parser"); // Handle cookies
require("dotenv").config(); // Load variables from .env file

const app = express(); // Create an Express app

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json()); // Allow JSON data in requests

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.use(cookieParser()); // Enable handling cookies

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

connectDB(); // Call the function to connect to MongoDB

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on https://eventum.onrender.com`);
});
