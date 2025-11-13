import React from "react";
import {
  FaSquareXTwitter,
  FaYoutube,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-300 dark:bg-gray-800 text-base-content dark:text-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3 text-primary">ArtVerse</h2>
          <p className="text-sm">
            Discover, showcase, and connect through creativity. ArtVerse — where
            imagination meets expression.
          </p>
          <p className="mt-4 text-sm opacity-80">
            © {new Date().getFullYear()} ArtVerse. All rights reserved.
          </p>
        </div>

        <nav>
          <h6 className="footer-title">Explore</h6>
          <div className="flex flex-col">
            <a className="link link-hover">Gallery</a>
            <a className="link link-hover">Artists</a>
            <a className="link link-hover">Collections</a>
            <a className="link link-hover">Exhibitions</a>
          </div>
        </nav>

        <nav>
          <h6 className="footer-title">About</h6>
          <div className="flex flex-col">
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Press</a>
          </div>
        </nav>

        <div>
          <h6 className="footer-title">Connect With Us</h6>
          <p className="flex items-center gap-2">
            <FaEnvelope /> support@artverse.com
          </p>
          <div className="flex gap-4 mt-4">
            <a aria-label="Twitter (X)">
              <FaSquareXTwitter className="w-6 h-6 hover:text-gray-900 transition-colors" />
            </a>
            <a aria-label="YouTube">
              <FaYoutube className="w-6 h-6 hover:text-red-500 transition-colors" />
            </a>
            <a aria-label="Facebook">
              <FaFacebookF className="w-6 h-6 hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
