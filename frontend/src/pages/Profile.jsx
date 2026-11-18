import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import api from "../api/api";
import { FaUser, FaPhone, FaEnvelope, FaShieldAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setFormData({ name: parsed.name || "", phone: parsed.phone || "" });
        } catch (e) {
          console.error(e);
        }
      }

      // Fetch live data from backend if token exists
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const profile = await api.getProfile();
          if (profile) {
            setUser({
              name: profile.name || "",
              email: profile.email || "",
              phone: profile.phone || "",
              isAdmin: profile.isAdmin || false,
            });
            setFormData({ name: profile.name || "", phone: profile.phone || "" });
            localStorage.setItem("user", JSON.stringify(profile));
          }
        } catch (err) {
          console.warn("Could not fetch remote profile:", err);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const updated = await api.updateProfile(formData);
      const newUser = { ...user, name: updated.name || formData.name, phone: updated.phone || formData.phone };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setEditMode(false);
      setStatusMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      console.error(err);
      // Fallback local update if offline
      const newUser = { ...user, name: formData.name, phone: formData.phone };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setEditMode(false);
      setStatusMsg({ type: "success", text: "Profile updated locally." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Account Details
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            User <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-slate-400 text-sm">Manage your personal information and contact settings</p>
        </div>

        {statusMsg.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm ${
              statusMsg.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg ring-4 ring-slate-800">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-bold text-white">{user.name || "Guest User"}</h2>
                  {user.isAdmin && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <FaShieldAlt /> Admin
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400">{user.email || "No email registered"}</p>
              </div>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              {editMode ? (
                <>
                  <FaTimes /> Cancel
                </>
              ) : (
                <>
                  <FaEdit /> Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Details Form / Display */}
          {editMode ? (
            <form onSubmit={handleSave} className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Address (Read-only)
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-md transition-all flex items-center gap-2"
                >
                  <FaCheck /> {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaUser />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Full Name</span>
                  <strong className="text-base font-semibold text-white">{user.name || "N/A"}</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Email Address</span>
                  <strong className="text-base font-semibold text-white">{user.email || "N/A"}</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaPhone />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Phone Number</span>
                  <strong className="text-base font-semibold text-white">{user.phone || "Not provided"}</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Account Status</span>
                  <strong className="text-base font-semibold text-emerald-400">
                    {user.isAdmin ? "Administrator" : "Active Member"}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
