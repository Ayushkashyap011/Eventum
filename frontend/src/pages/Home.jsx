import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import Feedback from "../components/Feedback";
import Footer from "../components/footer";
import "./home.css";
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <HeroSection />
        <AboutUs />
        <Services />
        <Feedback />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
