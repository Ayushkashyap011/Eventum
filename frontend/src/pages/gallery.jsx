import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
// import Footer from "../components/Footer";
import "./gallery.css";
import galleryHero from "../assets/moving-images.png"; // Replace with actual image
import img1 from "../assets/gallery1.jpeg"; // Replace with actual images
import img2 from "../assets/gallery2.jpeg";
import img3 from "../assets/gallery3.jpg";
import img4 from "../assets/gallery4.jpeg";
import img5 from "../assets/gallery5.jpg";
import img6 from "../assets/gallery5.jpeg";
import img7 from "../assets/gallery6.avif";
import img8 from "../assets/pool-party.jpg";
import img9 from "../assets/wedding.jpg";

const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const Gallery = () => {
  return (
    <>
    <div className="gallery-container">
      <Navbar />

      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="rotating-image-wrapper">
          <h1 className="animated-heading">Gallery</h1>
          <div className="rotating-image-container">
            <img src={galleryHero} alt="Gallery Hero" className="rotating-image" />
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>

    </div>
    <Footer />
    </>
  );
};

export default Gallery;
