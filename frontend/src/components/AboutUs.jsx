import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaAward, FaCalendarAlt, FaUsers, FaHeart } from "react-icons/fa";

const AboutUs = () => {
  const highlights = [
    "Full-service planning: venue booking, decor, catering & logistics",
    "Tailored themes that reflect your unique story & cultural traditions",
    "Strong network with prime venues across Bhubaneswar, Puri & Cuttack",
    "Transparent pricing with clear budget optimization at every step",
  ];

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800/80 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FaAward /> Trusted Event Leaders In Odisha
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Crafting Exceptional Occasions in the Heart of <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Odisha</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              <strong>Eventum</strong> is Odisha's premier event management company, dedicated to transforming your vision into flawless realities. Whether you're envisioning a royal destination wedding along Puri's coastline, a high-octane corporate summit in Bhubaneswar, a vibrant birthday extravaganza, or an unforgettable live concert, our passionate team orchestrates every detail with unmatched precision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-200 text-sm">
                  <FaCheckCircle className="text-amber-400 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-md transition-all"
              >
                Learn More About Us
              </Link>
              <Link
                to="/booking"
                className="px-6 py-3 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* Right Column: Stats & Value Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-xl space-y-2 text-center transform hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
                <FaCalendarAlt />
              </div>
              <h3 className="text-3xl font-extrabold text-white">500+</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Events Executed</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-xl space-y-2 text-center transform hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl">
                <FaHeart />
              </div>
              <h3 className="text-3xl font-extrabold text-white">99%</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Happy Clients</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-xl space-y-2 text-center transform hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl">
                <FaUsers />
              </div>
              <h3 className="text-3xl font-extrabold text-white">50+</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Expert Vendors</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-xl space-y-2 text-center transform hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
                <FaAward />
              </div>
              <h3 className="text-3xl font-extrabold text-white">100%</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Guaranteed Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
