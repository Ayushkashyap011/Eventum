import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { FaTimes, FaSearchPlus } from "react-icons/fa";

import img1 from "../assets/gallery1.jpeg";
import img2 from "../assets/gallery2.jpeg";
import img3 from "../assets/gallery3.jpg";
import img4 from "../assets/gallery4.jpeg";
import img5 from "../assets/gallery5.jpg";
import img6 from "../assets/gallery5.jpeg";
import img7 from "../assets/gallery6.avif";
import img8 from "../assets/pool-party.jpg";
import img9 from "../assets/wedding.jpg";
import img10 from "../assets/corporate-event1.jpeg";
import img11 from "../assets/wedding1.jpg";
import img12 from "../assets/birthday1.png";
import img13 from "../assets/wedding2.jpg";
import img14 from "../assets/coporate-imag1.jpg";
import img15 from "../assets/wedding3.jpg";

const galleryImages = [
  { img: img1, title: "Royal Wedding Mandap", category: "Weddings" },
  { img: img2, title: "Grand Banquet Setup", category: "Weddings" },
  { img: img3, title: "Live Concert Stage", category: "Concerts" },
  { img: img4, title: "Outdoor Reception", category: "Weddings" },
  { img: img5, title: "Floral Archways", category: "Weddings" },
  { img: img6, title: "Luxury Table Setting", category: "Corporate" },
  { img: img7, title: "Evening Illumination", category: "Weddings" },
  { img: img8, title: "Poolside Fiesta", category: "Parties" },
  { img: img9, title: "Traditional Odia Wedding", category: "Weddings" },
  { img: img10, title: "Corporate Summit Auditorium", category: "Corporate" },
  { img: img11, title: "Bridal Stage Lighting", category: "Weddings" },
  { img: img12, title: "Milestone Birthday Cake Table", category: "Parties" },
  { img: img13, title: "Palace Wedding Entrance", category: "Weddings" },
  { img: img14, title: "Keynote Conference Stage", category: "Corporate" },
  { img: img15, title: "Floral Stage Masterpiece", category: "Weddings" },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalImg, setActiveModalImg] = useState(null);

  const categories = ["All", "Weddings", "Corporate", "Parties", "Concerts"];

  const filtered =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 text-center px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Visual Highlights
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Eventum <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              A glimpse into the magical weddings, luxury decors, corporate stages, and concerts produced across Odisha.
            </p>

            {/* Category Filter Pills */}
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveModalImg(item)}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 shadow-xl"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-900/80 text-amber-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaSearchPlus size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Image Preview Modal */}
        {activeModalImg && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setActiveModalImg(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalImg(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-rose-500 transition-colors shadow"
              >
                <FaTimes />
              </button>
              <img
                src={activeModalImg.img}
                alt={activeModalImg.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-sm">
                <span className="font-bold text-white">{activeModalImg.title}</span>
                <span className="text-xs text-amber-400 font-semibold">{activeModalImg.category}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
