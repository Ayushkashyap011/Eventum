import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import corporateImg from "../assets/corporate-event.jpeg";
import weddingImg from "../assets/wedding.jpg";
import birthdayImg from "../assets/birthday.jpg";
import concertImg from "../assets/band-performance.jpg";
import destinationWeddingImg from "../assets/destination-wedding.jpeg";
import poolPartyImg from "../assets/pool-party.jpg";
import { FaCheckCircle, FaCalendarCheck } from "react-icons/fa";

const servicesData = [
  {
    title: "Weddings & Receptions",
    badge: "Most Cherished",
    description: "From traditional Odia Vedic rituals to grand luxury receptions, we handle venue selection, royal stage decor, mandap styling, catering feasts, and guest hospitality.",
    image: weddingImg,
    perks: ["Customized Stage & Mandap", "Catering & Live Food Counters", "Bridal Entry & Special Effects", "Guest Accommodation & Transport"],
  },
  {
    title: "Destination Weddings",
    badge: "Exotic",
    description: "Exchange vows along the golden sands of Puri or the royal heritage palaces of Odisha. Complete hospitality, airport charters, and multi-day itinerary execution.",
    image: destinationWeddingImg,
    perks: ["Beach & Palace Venue Booking", "Multi-Day Ritual Coordination", "Bespoke Cultural Themes", "Dedicated 24/7 Concierge"],
  },
  {
    title: "Corporate Conferences & Summits",
    badge: "Enterprise",
    description: "Impactful business gatherings, tech summits, annual galas, and product launches with state-of-the-art AV engineering, live webcasting, and seamless delegate registration.",
    image: corporateImg,
    perks: ["LED Walls & Dynamic Lighting", "Keynote Audio Engineering", "Brand Identity & Staging", "Executive Catering & Lounge"],
  },
  {
    title: "Live Concerts & Festivals",
    badge: "High Octane",
    description: "Electrifying live music, college fests, cultural nights, and celebrity artist performances. We manage acoustic balance, crowd logistics, artist riders, and safety.",
    image: concertImg,
    perks: ["Acoustic Engineering & Trussing", "Artist Booking & Hospitality", "Crowd & Entry Management", "Special Pyrotechnics & Laser Shows"],
  },
  {
    title: "Themed Birthday Bashes",
    badge: "Fun & Joy",
    description: "Make milestone birthdays truly unforgettable with creative 3D backdrop styling, interactive game zones, customized tiered cakes, and lively entertainment.",
    image: birthdayImg,
    perks: ["3D Theme Decors", "Customized Cake Tables", "Entertainers & Magic Shows", "Return Gift Curation"],
  },
  {
    title: "Pool Parties & Social Mixers",
    badge: "Chill & Social",
    description: "Cool down with tropical poolside celebrations, DJ beats, signature mocktail bars, water sports, and ambient sunset illuminations.",
    image: poolPartyImg,
    perks: ["Waterproof Sound Setup", "Tropical Beverage Bar", "Inflatable Loungers & Floaties", "BBQ & Sunset Dinners"],
  },
];

const ServicePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Our Capabilities
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Extraordinary Events, <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Impeccably Crafted</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              From intimate family milestones to massive 5,000+ attendee spectacles across Odisha, discover our full spectrum of event management solutions.
            </p>
          </div>
        </section>

        {/* Detailed Service Cards */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`lg:col-span-5 h-72 lg:h-96 rounded-2xl overflow-hidden relative shadow-lg ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                    {service.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-7 space-y-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="text-3xl font-black text-white tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    What's Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-md transition-all"
                  >
                    <FaCalendarCheck /> Book This Experience
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
