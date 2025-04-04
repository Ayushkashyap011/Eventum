const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventPlan: { type: String, required: true }, // Basic or Premium
    eventDetails: { type: String, required: true }, // Event description
    eventDate: { type: Date, required: true }, // Meeting time
    budget: { type: Number, required: true }, // Budget
    status: { type: String, enum: ["Pending", "Done", "Cancelled"], default: "Pending" }, // Pending, Confirmed, Cancelled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
