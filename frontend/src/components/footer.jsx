import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Socials */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Eventum"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
              />
              <span className="text-2xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                EVENTUM
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Odisha's premier event design, management, and production house. Making weddings, festivals, corporate galas, and private events truly unforgettable.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all shadow"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all shadow"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shadow"
                aria-label="YouTube"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://wa.me/919430777011"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About Eventum
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">
                  Event Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-amber-400 transition-colors font-medium text-amber-400">
                  Book an Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1 flex-shrink-0" />
                <span>Silicon University, Patia, Bhubaneswar, Odisha, 751024</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-400 flex-shrink-0" />
                <a href="tel:+919430777011" className="hover:text-white">
                  +91 9430777011 / 12
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-400 flex-shrink-0" />
                <a href="mailto:eventum@gmail.com" className="hover:text-white">
                  eventum@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Map Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Visit Our Office
            </h4>
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-md h-40">
              <iframe
                title="Eventum Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.293550331192!2d85.81905487444916!3d20.34456088103785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909f75f9c0871%3A0xe0b69a85cba5df68!2sSilicon%20Institute%20of%20Technology%2C%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1708195432105!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Eventum. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for unforgettable celebrations in Odisha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
