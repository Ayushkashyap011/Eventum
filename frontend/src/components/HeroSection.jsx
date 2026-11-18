import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import img1 from "../assets/hero-image1.jpg";
import img2 from "../assets/hero-image2.jpg";
import img3 from "../assets/hero-image3.jpg";

const HeroSection = () => {
  const slides = [
    {
      img: img1,
      tag: "ROYAL WEDDINGS & CELEBRATIONS",
      title: "Where Dreams Turn Into Grand Realities",
      desc: "From destination weddings in Puri to luxury banquets in Bhubaneswar, we craft unforgettable memories.",
    },
    {
      img: img2,
      tag: "CORPORATE EXCELLENCE & SUMMITS",
      title: "Inspiring Corporate Conferences & Galas",
      desc: "Flawless technical execution, immersive stage designs, and high-impact event production.",
    },
    {
      img: img3,
      tag: "LIVE CONCERTS & ENTERTAINMENT",
      title: "Electrifying Live Music & Shows",
      desc: "Top-tier acoustic engineering, artist curation, and lighting spectacles that amaze your audience.",
    },
  ];

  return (
    <section className="relative w-full h-[85vh] min-h-[580px] max-h-[820px] overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image with Dark Vignette */}
            <img
              src={slide.img}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.55] transform scale-105 transition-transform duration-[10000ms] ease-out"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80"></div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-left">
              <div className="max-w-2xl space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                  ✨ {slide.tag}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed drop-shadow">
                  {slide.desc}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/booking"
                    className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all"
                  >
                    Plan Your Event Today →
                  </Link>
                  <Link
                    to="/services"
                    className="px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all shadow-md"
                  >
                    View Our Services
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Trust Banner at bottom */}
      <div className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 items-center gap-8 px-8 py-3 rounded-2xl bg-slate-900/85 border border-slate-800 backdrop-blur-xl shadow-2xl text-xs text-slate-300">
        <div className="flex items-center gap-2 font-medium">
          <span className="text-amber-400 font-bold text-base">500+</span> Events Organized
        </div>
        <div className="h-4 w-px bg-slate-700"></div>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-rose-400 font-bold text-base">99%</span> Client Satisfaction
        </div>
        <div className="h-4 w-px bg-slate-700"></div>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-purple-400 font-bold text-base">100%</span> Customized Venues & Themes
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
