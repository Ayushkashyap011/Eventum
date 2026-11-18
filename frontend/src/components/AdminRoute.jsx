import React from "react";
import { Navigate, Link } from "react-router-dom";
import { FaShieldAlt, FaLock, FaHome } from "react-icons/fa";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  // 1. Not logged in -> Redirect to login
  if (!token || !storedUser) {
    return <Navigate to="/login" replace state={{ message: "Please sign in as an admin to access the Admin Panel." }} />;
  }

  let user = null;
  try {
    user = JSON.parse(storedUser);
  } catch (err) {
    console.error("Invalid user JSON in localStorage:", err);
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in, but NOT an admin -> Show Access Denied screen
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-3xl shadow-inner">
            <FaLock />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
              403 • Forbidden
            </span>
            <h1 className="text-2xl font-black text-white">Admin Access Restricted</h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              You are signed in as <strong className="text-white">{user.name || user.email}</strong>, which does not have administrator privileges.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <FaHome /> Return Home
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 transition-all shadow flex items-center justify-center gap-2"
            >
              <FaShieldAlt /> Sign In as Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. User is verified Admin
  return children;
};

export default AdminRoute;
