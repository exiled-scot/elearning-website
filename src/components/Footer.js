import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h2 className="footer-column-title">Business</h2>
        <a href="/#" className="footer-link">Teach</a>
        <a href="/#" className="footer-link">Get the app</a>
        <Link to="/about" className="footer-link">About us</Link>
        <a href="/#" className="footer-link">Contact us</a>
      </div>
      <div className="footer-column">
        <h2 className="footer-column-title">Careers</h2>
        <a href="/#" className="footer-link">Blog</a>
        <a href="/#" className="footer-link">Help and Support</a>
        <a href="/#" className="footer-link">Affiliate</a>
        <a href="/#" className="footer-link">Investors</a>
      </div>
      <div className="footer-column">
        <h2 className="footer-column-title">Legal</h2>
        <a href="/#" className="footer-link">Terms</a>
        <a href="/#" className="footer-link">Privacy policy</a>
        <a href="/#" className="footer-link">Sitemap</a>
        <a href="/#" className="footer-link">Accessibility statement</a>
      </div>
    </footer>
  );
};

export default Footer;
