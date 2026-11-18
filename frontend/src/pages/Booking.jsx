import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import api from "../api/api";
import { FaCalendarAlt, FaRupeeSign, FaCheck, FaInfoCircle, FaShieldAlt } from "react-icons/fa";

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventDate: "",
    eventPlan: "Premium Occasion",
    eventDetails: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const plans = [
    {
      id: "Standard Celebration",
      name: "Standard",
      badge: "Essential",
      desc: "Perfect for intimate birthdays, private socials, and anniversaries.",
      starting: "₹25,000",
      features: ["Thematic Venue Styling", "Audio & Sound Setup", "On-Day Coordinator"],
    },
    {
      id: "Premium Occasion",
      name: "Premium",
      badge: "Most Popular",
      desc: "Ideal for weddings, major receptions, and upscale galas.",
      starting: "₹75,000",
      features: ["Complete Decor & Florals", "Lighting & Sound Engineering", "Catering Coordination", "Dedicated Event Lead"],
    },
    {
      id: "Royal VIP Luxe",
      name: "Royal Luxe",
      badge: "All-Inclusive",
      desc: "For destination weddings, live concerts, and grand corporate summits.",
      starting: "₹2,00,000",
      features: ["Full Destination Logistics", "Artist & Performance Booking", "Luxury Hospitality Team", "Custom Stage & 3D Visuals"],
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectPlan = (planId) => {
    setFormData({ ...formData, eventPlan: planId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!isLoggedIn) {
      setMessage({
        type: "error",
        text: "You must be logged in to book an event. Please sign in or create an account.",
      });
      return;
    }

    if (!formData.eventDate || !formData.eventPlan || !formData.eventDetails || !formData.budget) {
      setMessage({ type: "error", text: "Please fill in all the required fields." });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        eventDate: formData.eventDate,
        eventPlan: formData.eventPlan,
        eventDetails: formData.eventDetails,
        budget: parseFloat(formData.budget),
      };

      await api.createBooking(payload);

      setMessage({
        type: "success",
        text: "🎉 Your event booking request has been submitted successfully! Redirecting to your bookings...",
      });

      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to submit booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Minimum date is tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Start Planning
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Book Your <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Dream Event</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Tell us about your event expectations, date, and budget. Our senior event planners will review your request and connect with you immediately.
          </p>
        </div>

        {/* Not Logged In Notice */}
        {!isLoggedIn && (
          <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-amber-300">
            <div className="flex items-center gap-3">
              <FaInfoCircle className="text-xl flex-shrink-0" />
              <span className="text-sm">Please log in to your account to book and track your events.</span>
            </div>
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow"
            >
              Sign In Now
            </Link>
          </div>
        )}

        {/* Message Banner */}
        {message.text && (
          <div
            className={`mb-8 p-4 rounded-xl border text-sm flex items-center gap-3 ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}
          >
            <FaInfoCircle /> {message.text}
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Step 1: Select Plan */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">1</span>
                Choose an Event Plan
              </h3>
              <span className="text-xs text-slate-400">All plans can be customized</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {plans.map((plan) => {
                const selected = formData.eventPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 border flex flex-col justify-between relative ${
                      selected
                        ? "bg-slate-900 border-amber-500 ring-2 ring-amber-500/30 shadow-xl"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    {selected && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">
                        <FaCheck />
                      </div>
                    )}
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-300 mb-2">
                        {plan.badge}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-1">{plan.name}</h4>
                      <p className="text-xs text-slate-400 mb-4">{plan.desc}</p>
                      <div className="text-sm font-semibold text-amber-400 mb-4">
                        Starts approx. {plan.starting}
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">•</span> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date & Budget */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">2</span>
              Schedule & Estimated Budget
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              {/* Event Date */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Target Event Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="eventDate"
                    min={minDateString}
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  />
                </div>
                <span className="text-[11px] text-slate-500">Pick the planned celebration or meeting date</span>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Estimated Budget (INR ₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="budget"
                    placeholder="e.g. 50000"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    min="1000"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  />
                </div>
                <span className="text-[11px] text-slate-500">Approximate budget you have allocated for this event</span>
              </div>
            </div>
          </div>

          {/* Step 3: Event Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
              Event Details & Preferences
            </h3>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Describe your vision, guest count & venue ideas *
              </label>
              <textarea
                name="eventDetails"
                rows="4"
                placeholder="Example: We are planning a wedding reception for around 300 guests in Bhubaneswar. Looking for a botanical garden theme with live acoustic music and traditional Odia catering..."
                value={formData.eventDetails}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              ></textarea>
              <span className="text-[11px] text-slate-500">The more context you provide, the faster our planners can prepare an accurate proposal</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FaShieldAlt className="text-amber-400 text-sm" />
              <span>No immediate payment required. We will review and provide a free quotation.</span>
            </div>

            <button
              type="submit"
              disabled={loading || !isLoggedIn}
              className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-white shadow-xl transition-all ${
                loading || !isLoggedIn
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 shadow-amber-500/20 transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Submitting Request...
                </span>
              ) : (
                "Confirm & Submit Booking"
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
