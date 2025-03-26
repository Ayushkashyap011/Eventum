import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlusG,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // 🟢 Added phone state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }), // 🟢 Sent phone data
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ name: data.name, phone: data.phone })); // 🟢 Stored phone
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ name: data.name, phone: data.phone || "" })); // 🟢 Set phone (if available)
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Signup Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required /> {/* 🟢 Added phone input */}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Login Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
