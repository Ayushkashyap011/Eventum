import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./Booking.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    eventDate: "",
    eventPlan: "",
    eventDetails: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const token = localStorage.getItem("token"); // Get token

      if (!token) {
        alert("⚠️ You need to log in to book an event.");
        setLoading(false);
        return;
      }

      const response = await fetch("https://eventum.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Booking submitted successfully!");
        setFormData({
          eventDate: "",
          eventPlan: "",
          eventDetails: "",
          budget: "",
        }); // Reset form
      } else {
        alert(`❌ Booking failed: ${data.message || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("⚠️ An error occurred while submitting the booking.");
    }

    setLoading(false); // Stop loading
  };

  return (
    <>
      <div className="booking-container">
        <Navbar />
        <section className="booking-form">
          <h1>📅 Book Your Event</h1>
          <form onSubmit={handleSubmit}>
            {/* Meeting Time */}
            <label>Meeting Time:</label>
            <input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />

            {/* Event Plan Selection */}
            <label>Event Plan:</label>
            <select name="eventPlan" value={formData.eventPlan} onChange={handleChange} required>
              <option value="">Select Plan</option>
              <option value="Basic">Basic Package</option>
              <option value="Premium">Premium Package</option>
            </select>

            {/* Event Description */}
            <label>Describe Your Event:</label>
            <textarea
              name="eventDetails"
              value={formData.eventDetails}
              onChange={handleChange}
              required
              placeholder="Tell us about your event, theme, expectations..."
            ></textarea>

            {/* Estimated Budget */}
            <label>Estimated Budget (₹):</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Booking;