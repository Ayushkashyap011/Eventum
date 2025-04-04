import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaChartPie } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalBookings: 0, totalRevenue: 0 });
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState("Admin");
  const [activeTab, setActiveTab] = useState("Dashboard");

  const API_BASE = "https://eventum.onrender.com/api/admin";

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const response = await fetch(`${API_BASE}/dashboard-stats`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setStats({
          totalUsers: data.stats?.totalUsers || 0,
          totalBookings: data.stats?.totalBookings || 0,
          totalRevenue: data.stats?.totalRevenue || 0,
        });
        setAdminName(data.adminName || "Admin");
      } else {
        console.error("Error fetching stats:", data.message);
      }
    } catch (error) {
      console.error("Dashboard API Error:", error.message);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_BASE}/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        console.error("No users found");
      }
    } catch (error) {
      console.error("User Fetch Error:", error.message);
    }
  };

  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_BASE}/all-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setBookings(data.bookings);
      } else {
        console.error("Error fetching bookings:", data.message);
      }
    } catch (error) {
      console.error("Booking Fetch Error:", error.message);
    }
  };

  // Update Booking Status
  const updateBookingStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_BASE}/update-booking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking status updated successfully!");
        fetchBookings(); // Refresh bookings after update
      } else {
        console.error("Error updating booking:", data.message);
      }
    } catch (error) {
      console.error("Update Error:", error.message);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchUsers();
    fetchBookings();
  }, []);

  // Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div className={`admin-container ${activeTab !== "Dashboard" ? "center-content" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          {["Dashboard", "Bookings", "Users"].map((tab) => (
            <li key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-navbar">
          <h2>Welcome, {adminName} 👋</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        {/* Dashboard Overview */}
        {activeTab === "Dashboard" && (
          <>
            <h1>Admin Dashboard</h1>
            <div className="stats">
              <div className="card">
                <FaUser className="icon" />
                <div>
                  <p>Total Users</p>
                  <h2>{stats.totalUsers}</h2>
                </div>
              </div>
              <div className="card">
                <FaCalendarAlt className="icon" />
                <div>
                  <p>Total Bookings</p>
                  <h2>{stats.totalBookings}</h2>
                </div>
              </div>
              <div className="card">
                <FaMoneyBillWave className="icon" />
                <div>
                  <p>Total Revenue</p>
                  <h2>₹{stats.totalRevenue.toLocaleString()}</h2>
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
          </>
        )}

        {/* Booking Management */}
        {activeTab === "Bookings" && (
          <div className="table-container">
            <h2>Booking Management</h2>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user?.name || "Unknown"}</td>
                    <td>{booking.user?.email || "N/A"}</td>
                    <td>{booking.user?.phone || "N/A"}</td>
                    <td>{booking.eventName}</td>
                    <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* User Management */}
        {activeTab === "Users" && (
          <div className="table-container">
            <h2>User Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
