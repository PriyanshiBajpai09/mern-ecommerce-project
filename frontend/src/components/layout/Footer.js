import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t py-6 px-4">

      <div className="max-w-4xl mx-auto text-center space-y-3">

        {/* TITLE */}
        <h3 className="text-lg font-semibold tracking-wide">
          E-Store
        </h3>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-500">
          Building modern e-commerce experiences with clean UI & powerful backend.
        </p>

        {/* LINKS */}
        <div className="flex justify-center items-center gap-3 text-xs text-gray-600">
          <Link to="/about" className="hover:text-black transition">
            About
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/contact" className="hover:text-black transition">
            Contact
          </Link>
        </div>

        {/* COPYRIGHT */}
        <p className="text-[11px] text-gray-400">
          © {new Date().getFullYear()} Priyanshi Bajpai. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;