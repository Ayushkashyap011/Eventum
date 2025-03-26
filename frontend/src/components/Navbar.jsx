import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import "./navbar.css";

const Navbar = () => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    nav("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="navbar-logo"
        onClick={() => nav("/")}
        style={{ cursor: "pointer" }}
      />

      {/* Navigation Links */}
      <div className="navbar-menu">
        <span className="nav-link" onClick={() => nav("/")}>Home</span>
        <span className="nav-link" onClick={() => nav("/about")}>About</span>
        <span className="nav-link" onClick={() => nav("/services")}>Services</span>
        <span className="nav-link" onClick={() => nav("/gallery")}>Gallery</span>

        {/* ✅ User Dropdown Menu */}
        {user ? (
          <div className="user-dropdown">
            <span className="user-name">{user.name} ▼</span>
            <ul className="dropdown-menu">
              <li onClick={() => nav("/profile")}>My Profile</li>
              <li onClick={() => nav("/my-bookings")}>My Bookings</li> {/* ✅ Added My Bookings */}
              <li onClick={handleLogout}>Sign Out</li>
            </ul>
          </div>
        ) : (
          <button className="navbar-button" onClick={() => nav("/login")}>
            Login / Signup
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="navbar-toggle" onClick={() => console.log("Toggle Menu")}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
