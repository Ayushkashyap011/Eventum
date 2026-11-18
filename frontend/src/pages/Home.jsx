import React from "react";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutUs />
        <Services />
        <Feedback />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
