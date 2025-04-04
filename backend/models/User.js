const mongoose = require("mongoose");

// Define the user schema (structure of user data)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Admin flag
}, { timestamps: true });  // Auto add createdAt & updatedAt fields

// Create and export the User model
module.exports = mongoose.model("User", userSchema);




