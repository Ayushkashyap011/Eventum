import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./Booking.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    meetingTime: "",
    eventStartTime: "",
    eventPlan: "",
    eventDetails: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted successfully!");
  };

  return (
    <div className="booking-container">
      <Navbar />
      <section className="booking-form">
        <h1>Book Your Event</h1>
        <form onSubmit={handleSubmit}>
          {/* Meeting Time */}
          <label>Meeting Time:</label>
          <input type="datetime-local" name="meetingTime" onChange={handleChange} required />

          {/* Event Plan Selection */}
          <label>Event Plan:</label>
          <select name="eventPlan" onChange={handleChange} required>
            <option value="">Select Plan</option>
            <option value="basic">Basic Package</option>
            <option value="premium">Premium Package</option>
          </select>

          {/* Event Description */}
          <label>Describe Your Event:</label>
          <textarea name="eventDetails" onChange={handleChange} required placeholder="Tell us about your event, theme, expectations..."></textarea>

          {/* Estimated Budget */}
          <label>Estimated Budget (₹):</label>
          <input type="number" name="budget" onChange={handleChange} required />

          {/* Submit Button */}
          <button type="submit">Submit Booking</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Booking;
