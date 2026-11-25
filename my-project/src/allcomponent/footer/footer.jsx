import React from "react";
import "./footer.css";
import logo from "../assets/about/aura_watch.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src={logo} alt="ELDORADO WATCH" className="footer-logo" />
            <span className="footer-brand-name">ELDORADO WATCH</span>
          </div>
          <p className="footer-tagline">
            Curating and crafting luxury timepieces with timeless design,
            reliable movements, and enduring elegance.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-col">
          <h4>EXPLORE</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Services & Care */}
        <div className="footer-col">
          <h4>CONCIERGE</h4>
          <ul>
            <li>
              <a href="/contact">Book a Viewing</a>
            </li>
            <li>
              <a href="/contact">Watch Servicing &amp; Warranty</a>
            </li>
            <li>
              <a href="/contact">Corporate &amp; Gifting</a>
            </li>
          </ul>
        </div>

        {/* Boutique Info */}
        <div className="footer-col">
          <h4>BOUTIQUE</h4>
          <p className="footer-detail">Connaught Place, New Delhi</p>
          <p className="footer-detail">concierge@eldoradowatch.com</p>
          <p className="footer-detail">+91 98765 43210</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {currentYear} ELDORADO WATCH. All rights reserved.</p>
        <p className="footer-note">Crafted for Timeless Moments</p>
      </div>
    </footer>
  );
};

export default Footer;