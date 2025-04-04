import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/AboutPage";
import Services from "./pages/Servicepage";
import Booking from "./pages/Booking";
import Gallery from "./pages/gallery";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/booking" element={<Booking />}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/profile" element ={<Profile/>}/>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path ="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
