import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./navbar.css";

const Navbar = () => {
  const nav = useNavigate();

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
        <span className="nav-link" onClick={() => nav("/contact")}>Contact</span>
        <button className="navbar-button" onClick={() => nav("/login")}>
          Login / Signup
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="navbar-toggle" onClick={() => console.log("Toggle Menu")}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
