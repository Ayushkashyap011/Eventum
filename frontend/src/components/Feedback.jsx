import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const feedbackData = [
  {
    name: "Subham Mohapatra",
    role: "Wedding Client, Bhubaneswar",
    feedback: "The royal wedding they organized for us at Mayfair was beyond words. Every single guest complimented the seamless execution and breathtaking stage decor!",
    rating: 5,
  },
  {
    name: "Priyanka Mishra",
    role: "Destination Wedding, Puri",
    feedback: "Planning a coastal wedding from Mumbai seemed daunting, but Eventum made it effortless. Flawless hospitality, vendor coordination, and authentic Odia touches.",
    rating: 5,
  },
  {
    name: "Rohan Sengupta",
    role: "Corporate Summit Organizer",
    feedback: "Our annual tech conference hosted 400+ delegates. The audio-visuals, stage setup, and catering logistics were handled with sheer professionalism.",
    rating: 5,
  },
  {
    name: "Ananya Patnaik",
    role: "1st Birthday Party",
    feedback: "Loved the fairytale wonderland theme! The photo booths, customized cake table, and kids entertainment kept everyone mesmerized.",
    rating: 5,
  },
  {
    name: "Debashish Das",
    role: "Live Music Gala",
    feedback: "The acoustics, sound balance, and dynamic lighting for our college cultural fest were electrifying! Truly the top event managers in Odisha.",
    rating: 5,
  },
  {
    name: "Sneha Roy",
    role: "Silver Jubilee Celebration",
    feedback: "Attention to detail was unbelievable. From warm welcoming to heartfelt mementos, they treated our family celebration like their own.",
    rating: 5,
  },
];

const Feedback = () => {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Real Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Loved by Over <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">500+ Families & Brands</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Hear what our happy couples, corporate partners, and hosts have to say about their Eventum experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackData.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-slate-700 text-xl" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{item.feedback}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
