import React from "react";
import { Link } from "react-router-dom";
import birthdayImg from "../assets/birthday.jpg";
import bandImg from "../assets/band-performance.jpg";
import weddingImg from "../assets/wedding.jpg";
import destinationWeddingImg from "../assets/destination-wedding.jpeg";
import corporateImg from "../assets/corporate-event.jpeg";
import poolPartyImg from "../assets/pool-party.jpg";

const Services = () => {
  const services = [
    {
      title: "Royal Weddings",
      category: "Celebrations",
      description: "Two souls, one timeless story. Bespoke stage decor, rituals coordination, and majestic banquets.",
      image: weddingImg,
      badge: "Popular",
    },
    {
      title: "Destination Weddings",
      category: "Luxury",
      description: "Say 'I Do' against breathtaking oceanfronts or heritage palaces in Puri, Gopalpur & beyond.",
      image: destinationWeddingImg,
      badge: "Exclusive",
    },
    {
      title: "Corporate Summits & Galas",
      category: "Corporate",
      description: "Conferences, awards ceremonies, product launches and team retreats with flawless production.",
      image: corporateImg,
      badge: "Professional",
    },
    {
      title: "Live Band & Concerts",
      category: "Entertainment",
      description: "Where music speaks. Acoustic engineering, high-tech lighting, artist management & sound.",
      image: bandImg,
      badge: "High Energy",
    },
    {
      title: "Birthday Extraordinaire",
      category: "Private Parties",
      description: "Theme styling, entertainment, cake artistry, and fun experiences for milestones of every age.",
      image: birthdayImg,
      badge: "Custom Themes",
    },
    {
      title: "Pool Parties & Socials",
      category: "Leisure",
      description: "Sun, music, tropical mocktails, and electric vibes crafted for unforgettable weekend bashes.",
      image: poolPartyImg,
      badge: "Vibrant",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
            What We Deliver
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Our Premium <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">Event Services</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We handle everything from initial moodboards to the final applause, so you can immerse yourself in every celebratory moment.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow">
                    {service.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-rose-400">
                    {service.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Description & Action */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Full Customization</span>
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-all"
                  >
                    Book This Event →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-slate-800">
          <h3 className="text-2xl font-bold text-white mb-2">Have a unique idea or custom requirement?</h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-6 text-sm">
            We customize every package according to your guest count, venue preferences, and creative concepts.
          </p>
          <Link
            to="/booking"
            className="inline-block px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 shadow-lg transition-all"
          >
            Request Custom Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
