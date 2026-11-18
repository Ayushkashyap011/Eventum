import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import logo from "../assets/logo.jpg";
import { FaBullseye, FaEye, FaAward, FaHandshake, FaMapMarkedAlt } from "react-icons/fa";

const AboutPage = () => {
  const values = [
    {
      icon: FaBullseye,
      title: "Our Mission",
      desc: "To deliver transcendent event experiences that exceed all expectations through relentless creativity, impeccable logistical timing, and heartfelt hospitality.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: FaEye,
      title: "Our Vision",
      desc: "To be Eastern India’s most celebrated and innovative event production house, known for elevating cultural heritage into contemporary luxury.",
      color: "from-rose-500 to-rose-600",
    },
    {
      icon: FaHandshake,
      title: "Client-First Promise",
      desc: "We treat every client’s milestone as if it were our own family celebration, with total transparency, cost efficiency, and zero compromises.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const milestones = [
    { year: "2018", title: "Founded in Bhubaneswar", desc: "Started as a boutique wedding design studio serving families across Odisha." },
    { year: "2020", title: "Expanded to Corporate & Summits", desc: "Successfully managed statewide industry conventions and virtual-hybrid summits." },
    { year: "2022", title: "Destination Events in Puri & Gopalpur", desc: "Pioneered beachfront royal wedding setups with comprehensive guest logistics." },
    { year: "2024", title: "500+ Milestone Events Celebrated", desc: "Recognized as a leading full-stack event production and management company." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <img
              src={logo}
              alt="Eventum Logo"
              className="w-24 h-24 mx-auto rounded-full object-cover ring-4 ring-amber-500/50 shadow-2xl"
            />
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
              The Story of Eventum
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Bringing Celebrations to Life with <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Passion & Precision</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Based at Bhubaneswar, Odisha, Eventum is built on the belief that every celebration should feel effortless for the host and breathtaking for every guest.
            </p>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-xl space-y-4 transform hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${v.color} text-white flex items-center justify-center text-2xl shadow-lg`}>
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline / Journey */}
        <section className="py-20 bg-slate-900/60 border-t border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Our Milestones</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Our Journey Through The Years</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4"
                >
                  <span className="text-2xl font-black text-amber-400/80 font-mono flex-shrink-0">
                    {m.year}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{m.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-20 text-center max-w-4xl mx-auto px-4">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-slate-800 space-y-5">
            <h2 className="text-3xl font-black text-white">Ready to plan your next milestone event?</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Connect with our senior event planners today for a free design consultation and comprehensive quote.
            </p>
            <div className="pt-2">
              <Link
                to="/booking"
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-xl transition-all inline-block"
              >
                Plan Your Event Now →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
