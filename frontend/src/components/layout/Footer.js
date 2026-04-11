import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container text-center">

        <h3 className="footer-title">TechStore</h3>

        <p className="footer-text">
          Building modern e-commerce experiences with clean UI & powerful backend.
        </p>

        <div className="footer-links">
          <Link to="/about">About</Link>
          <span>|</span>
          <Link to="/contact">Contact</Link>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Priyanshi Bajpai. All Rights Reserved.
        </p>

      </div>
    </div>
  );
};

export default Footer;