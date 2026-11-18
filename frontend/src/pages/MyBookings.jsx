import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import api from "../api/api";
import { FaCalendarAlt, FaRupeeSign, FaClock, FaCheckCircle, FaTimesCircle, FaPlus } from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view your bookings.");
          setLoading(false);
          return;
        }

        const data = await api.getMyBookings();
        if (data.success && Array.isArray(data.data)) {
          setBookings(data.data);
        } else if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Done":
      case "Confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <FaCheckCircle /> Confirmed
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <FaTimesCircle /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <FaClock /> Pending Review
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              My <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Bookings</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your upcoming event reservations, review status, and details.
            </p>
          </div>

          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-md transition-all"
          >
            <FaPlus /> Book New Event
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-slate-400">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl">
              <FaCalendarAlt />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">No Bookings Found</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                You haven't requested any event reservations yet. Ready to start planning your next special moment?
              </p>
            </div>
            <Link
              to="/booking"
              className="inline-block px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-rose-500 shadow-lg hover:from-amber-400 hover:to-rose-400 transition-all"
            >
              Plan Your First Event
            </Link>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id || booking.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700 p-6 shadow-xl transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      ID: #{String(booking._id || booking.id).slice(-8)}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {booking.eventPlan || "Event Plan"}
                    </h3>
                  </div>
                  <div>{getStatusBadge(booking.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 text-slate-300">
                    <FaCalendarAlt className="text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">Event Date</span>
                      <strong className="text-white font-medium">{formatDate(booking.eventDate)}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <FaRupeeSign className="text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 block">Estimated Budget</span>
                      <strong className="text-white font-medium">₹{Number(booking.budget || 0).toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                </div>

                {booking.eventDetails && (
                  <div className="pt-2 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-slate-300">
                    <span className="text-slate-400 font-semibold block mb-1">Your Requirements:</span>
                    <p className="leading-relaxed">{booking.eventDetails}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
