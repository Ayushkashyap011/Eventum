import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import "./servicepage.css";
import rotatingImage from "../assets/moving-images.png";
import corporateImg from "../assets/corporate-event.jpeg";
import weddingImg from "../assets/wedding.jpg";
import birthdayImg from "../assets/birthday.jpg";
import concertImg from "../assets/band-performance.jpg";

const servicesData = [
  {
    title: "Corporate Events",
    description:
      "We plan impactful corporate events, including conferences, product launches, and seminars with high-quality execution.",
    image: corporateImg,
    details:
      "Our corporate event management includes venue selection, guest coordination, AV setup, catering, and post-event analysis.",
  },
  {
    title: "Weddings",
    description:
      "We make dream weddings come true with stunning décor, perfect coordination, and unforgettable experiences.",
    image: weddingImg,
    details:
      "Our wedding services cover venue selection, themed decor, catering, photography, entertainment, and guest management.",
  },
  {
    title: "Birthday Parties",
    description:
      "Celebrate birthdays in style with themed decorations, fun activities, and a perfect party experience.",
    image: birthdayImg,
    details:
      "We handle invitations, customized themes, decorations, entertainment, and special birthday surprises.",
  },
  {
    title: "Concerts & Festivals",
    description:
      "From large-scale concerts to vibrant festivals, we ensure smooth execution and an electrifying atmosphere.",
    image: concertImg,
    details:
      "We take care of artist bookings, stage setup, lighting, security, ticketing, and crowd management.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="services-container">
        <Navbar />

        {/* Hero Section */}
        <section className="services-hero">
          <div className="rotating-image-container">
            <img src={rotatingImage} alt="Rotating Logo" className="rotating-image" />
          </div>
          <h1>Our Services</h1>
          <p>Where Every Event Becomes a Celebration.</p>
        </section>

        {/* Services List */}
        <div className="services-list">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card-page">
              <div className="service-content-page">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <p className="service-details">{service.details}</p>
                <button onClick={() => navigate("/booking")}>Book Now</button>
              </div>
              <div className="service-image-page" style={{ backgroundImage: `url(${service.image})` }}></div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Services;
