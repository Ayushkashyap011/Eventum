import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaChartPie } from "react-icons/fa";
import "./AdminDashboard.css"; // Import CSS file

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchUsers();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Dashboard</li>
          <li>Bookings</li>
          <li>Users</li>
          <li>Analytics</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <h1>Admin Dashboard</h1>

        {/* Stats Overview */}
        <div className="stats">
          <div className="card">
            <FaUser className="icon" />
            <div>
              <p>Total Users</p>
              <h2>{users.length}</h2>
            </div>
          </div>
          <div className="card">
            <FaCalendarAlt className="icon" />
            <div>
              <p>Total Bookings</p>
              <h2>{bookings.length}</h2>
            </div>
          </div>
          <div className="card">
            <FaMoneyBillWave className="icon" />
            <div>
              <p>Total Revenue</p>
              <h2>₹50,000</h2>
            </div>
          </div>
          <div className="card">
            <FaChartPie className="icon" />
            <div>
              <p>Event Trends</p>
              <h2>🔼 12%</h2>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <h2>Booking Management</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user.name}</td>
                  <td>{booking.eventName}</td>
                  <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Users Table */}
        <h2>User Management</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
