import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./Aboutpage.css";
import logo from "../assets/logo.jpg"; // Ensure this path is correct

const About = () => {
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mission = document.querySelector(".mission-section");
      const vision = document.querySelector(".vision-section");

      if (mission && vision) {
        const missionTop = mission.getBoundingClientRect().top;
        const visionTop = vision.getBoundingClientRect().top;
        const triggerHeight = window.innerHeight * 0.75; // Triggers animation earlier

        if (missionTop < triggerHeight) {
          setShowMission(true);
        }
        if (visionTop < triggerHeight) {
          setShowVision(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run initially to check if items are already in view

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <img src={logo} alt="Eventum Logo" className="hero-logo" />
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At <strong>Eventum</strong>, we bring your events to life with creativity and precision. 
          From corporate events to weddings, we handle everything with perfection, making sure 
          your special moments are unforgettable.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <div className="mission-vision-container">
        <div className={`mission-section ${showMission ? "slide-left" : ""}`}>
          <h2>Our Mission</h2>
          <p>
            To create breathtaking events that exceed expectations, providing innovative 
            and seamless experiences for our clients.
          </p>
        </div>

        <div className={`vision-section ${showVision ? "slide-right" : ""}`}>
          <h2>Our Vision</h2>
          <p>
            To be the leading event management company known for our dedication to excellence, 
            creativity, and customer satisfaction.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
