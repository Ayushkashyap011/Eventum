import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaShieldAlt,
  FaSignOutAlt,
  FaHome,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSync,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalBookings: 0, totalRevenue: 0 });
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState("Admin");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.getDashboardStats();
      if (statsRes.success) {
        setStats(statsRes.stats || { totalUsers: 0, totalBookings: 0, totalRevenue: 0 });
        setAdminName(statsRes.adminName || statsRes.admin?.name || "Admin");
      }

      const usersRes = await api.getAllUsers();
      if (usersRes.success && Array.isArray(usersRes.users)) {
        setUsers(usersRes.users);
      }

      const bookingsRes = await api.getAllBookings();
      if (bookingsRes.success && Array.isArray(bookingsRes.bookings)) {
        setBookings(bookingsRes.bookings);
      } else if (bookingsRes.success && Array.isArray(bookingsRes.data)) {
        setBookings(bookingsRes.data);
      }
    } catch (err) {
      console.error("Admin load error:", err);
      if (
        err.message?.toLowerCase().includes("unauthorized") ||
        err.message?.toLowerCase().includes("denied") ||
        err.message?.toLowerCase().includes("forbidden")
      ) {
        alert("Session expired or unauthorized. Please sign in as an admin.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    setStatusUpdating(id);
    try {
      await api.updateBookingStatus(id, newStatus);
      // Update local state optimistically
      const updatedBookings = bookings.map((b) =>
        b._id === id || b.id === id ? { ...b, status: newStatus } : b
      );
      setBookings(updatedBookings);

      // Recalculate revenue optimistically excluding cancelled bookings
      const newRevenue = updatedBookings
        .filter((b) => b.status !== "Cancelled" && b.status !== "cancelled")
        .reduce((sum, b) => sum + (Number(b.budget) || 0), 0);
      setStats((prev) => ({ ...prev, totalRevenue: newRevenue }));

      // Also sync latest stats with server
      api.getDashboardStats().then((res) => {
        if (res.success && res.stats) setStats(res.stats);
      }).catch(() => {});
    } catch (err) {
      alert("Failed to update booking: " + err.message);
    } finally {
      setStatusUpdating(null);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out of the Admin Panel?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase();
    const plan = (b.eventPlan || "").toLowerCase();
    const status = (b.status || "").toLowerCase();
    const userName = (b.user?.name || "").toLowerCase();
    const userEmail = (b.user?.email || "").toLowerCase();
    return plan.includes(q) || status.includes(q) || userName.includes(q) || userEmail.includes(q);
  });

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold shadow-md">
              <FaShieldAlt />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wider text-white">EVENTUM</h2>
              <span className="text-[10px] tracking-widest uppercase text-amber-400 font-bold">Admin Console</span>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "Dashboard", icon: FaChartPie, label: "Overview" },
              { id: "Bookings", icon: FaCalendarAlt, label: "Manage Bookings" },
              { id: "Users", icon: FaUser, label: "User Directory" },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <FaHome /> Back to Website
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all text-left"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8">
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">{adminName}</span> 👋
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Eventum Real-Time Operations & Reservation Analytics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all text-sm flex items-center gap-2 shadow"
              title="Refresh Data"
            >
              <FaSync className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </div>

        {/* Dashboard Overview Tab */}
        {activeTab === "Dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
                    <FaUser />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white">{stats.totalUsers}</h3>
                <p className="text-xs text-slate-500">Registered client accounts</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-lg">
                    <FaCalendarAlt />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white">{stats.totalBookings}</h3>
                <p className="text-xs text-slate-500">All submitted event plans</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Est. Total Revenue</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
                    <FaMoneyBillWave />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white">
                  ₹{Number(stats.totalRevenue || 0).toLocaleString("en-IN")}
                </h3>
                <p className="text-xs text-slate-500">Cumulative pipeline value</p>
              </div>
            </div>

            {/* Quick Actions & Recent Bookings Preview */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Recent Event Bookings</h3>
                <button
                  onClick={() => setActiveTab("Bookings")}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  View All ({bookings.length}) →
                </button>
              </div>

              {bookings.length === 0 ? (
                <p className="text-sm text-slate-500 py-6 text-center">No bookings logged yet.</p>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((b) => (
                    <div
                      key={b._id || b.id}
                      className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm"
                    >
                      <div>
                        <strong className="text-white font-semibold">{b.eventPlan}</strong>
                        <p className="text-xs text-slate-400">
                          Client: {b.user?.name || "Guest"} • {b.user?.email || "No email"}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-emerald-400">
                          ₹{Number(b.budget || 0).toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {b.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "Bookings" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Event Bookings Management</h2>
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  placeholder="Search plan, client, status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-10 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                No matching bookings found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl">
                <table className="w-full text-left text-sm text-slate-300 bg-slate-900">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Client Details</th>
                      <th className="px-6 py-4">Event Plan</th>
                      <th className="px-6 py-4">Event Date</th>
                      <th className="px-6 py-4">Budget</th>
                      <th className="px-6 py-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredBookings.map((b) => (
                      <tr key={b._id || b.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <strong className="text-white block font-medium">{b.user?.name || "N/A"}</strong>
                          <span className="text-xs text-slate-400 block">{b.user?.email || "N/A"}</span>
                          {b.user?.phone && (
                            <span className="text-xs text-slate-500 block">{b.user.phone}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-white">{b.eventPlan}</span>
                          {b.eventDetails && (
                            <p className="text-xs text-slate-400 max-w-xs truncate mt-0.5" title={b.eventDetails}>
                              {b.eventDetails}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-300">
                          {b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-IN") : "TBD"}
                        </td>
                        <td className="px-6 py-4 font-bold text-emerald-400 text-xs">
                          ₹{Number(b.budget || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={b.status || "Pending"}
                            disabled={statusUpdating === (b._id || b.id)}
                            onChange={(e) => handleUpdateStatus(b._id || b.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer transition-all ${
                              b.status === "Done"
                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                : b.status === "Cancelled"
                                ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            <option value="Pending" className="bg-slate-900 text-amber-400">Pending</option>
                            <option value="Done" className="bg-slate-900 text-emerald-400">Done / Confirmed</option>
                            <option value="Cancelled" className="bg-slate-900 text-rose-400">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "Users" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Registered Client Directory</h2>
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  placeholder="Search user by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="p-10 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                No matching users found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl">
                <table className="w-full text-left text-sm text-slate-300 bg-slate-900">
                  <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredUsers.map((u) => (
                      <tr key={u._id || u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center">
                            {(u.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-white">{u.name}</span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-300">{u.email}</td>
                        <td className="px-6 py-4 text-xs text-slate-400">{u.phone || "N/A"}</td>
                        <td className="px-6 py-4">
                          {u.isAdmin ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Admin
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700">
                              Client
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-400">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN") : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
