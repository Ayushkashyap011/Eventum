import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import About from "./pages/AboutPage";
import Services from "./pages/Servicepage";
import Booking from "./pages/booking";
import Gallery from "./pages/gallery";

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

      </Routes>
    </Router>
  );
};

export default App;
