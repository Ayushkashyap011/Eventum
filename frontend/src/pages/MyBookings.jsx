import React, { useState, useEffect } from "react";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/bookings/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setBookings(data);
        } else {
          console.error("Error fetching bookings:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h2>{booking.eventName}</h2>
              <p><strong>Date:</strong> {new Date(booking.eventDate).toDateString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Booked On:</strong> {new Date(booking.createdAt).toDateString()}</p>
              <p><strong>Budget:</strong> ${booking.budget || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
