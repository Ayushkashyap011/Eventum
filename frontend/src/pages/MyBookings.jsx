import React, { useState, useEffect } from "react";
import "./MyBookings.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch("https://eventum.onrender.com/api/bookings/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2)); 

        if (response.ok) {
          if (Array.isArray(data.data)) {  
            setBookings(data.data);  
          } else {
            setError("Unexpected API response format.");
            console.error("Unexpected API format:", data);
          }
        } else {
          setError(data.message || "Failed to fetch bookings.");
        }
      } catch (error) {
        setError("Error fetching bookings.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="out">
            <Navbar />
      <div className="my-bookings-container">
        <h1>My Bookings</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <h2>{booking.eventPlan}</h2>
                <p><strong>Details:</strong> {booking.eventDetails}</p>
                <p><strong>Date:</strong> {new Date(booking.eventDate).toDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Booked On:</strong> {new Date(booking.createdAt).toDateString()}</p>
                <p><strong>Budget:</strong> ${booking.budget || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MyBookings;
