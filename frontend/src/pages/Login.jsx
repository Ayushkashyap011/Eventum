import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../api/api";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        // Signup
        const res = await api.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });

        localStorage.setItem("token", res.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.name || formData.name,
            email: res.email || formData.email,
            phone: res.phone || formData.phone,
            isAdmin: res.isAdmin || false,
          })
        );

        if (res.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        // Login
        const res = await api.login({
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.name || "User",
            email: res.email || formData.email,
            phone: res.phone || "",
            isAdmin: res.isAdmin || false,
          })
        );

        if (res.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden text-slate-100">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Home Link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <FaArrowLeft /> Back to Eventum
      </Link>

      <div className="max-w-md w-full bg-slate-900/90 rounded-3xl border border-slate-800 p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img
              src={logo}
              alt="Eventum"
              className="w-16 h-16 rounded-full mx-auto object-cover ring-4 ring-amber-500/40 shadow-lg"
            />
          </Link>
          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            EVENTUM
          </h2>
          <p className="text-xs text-slate-400">
            {isSignup ? "Create your account to book and manage events" : "Sign in to access your event bookings & account"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setIsSignup(false);
              setError("");
            }}
            className={`py-2 rounded-lg transition-all ${
              !isSignup ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignup(true);
              setError("");
            }}
            className={`py-2 rounded-lg transition-all ${
              isSignup ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* State Notice Banner */}
        {location.state?.message && !error && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            {location.state.message}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Subham Mohapatra"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>
          )}

          {isSignup && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 9430777011"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="4"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Processing...
              </span>
            ) : isSignup ? (
              "Complete Registration"
            ) : (
              "Sign In to Account"
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-amber-400 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="text-amber-400 font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
