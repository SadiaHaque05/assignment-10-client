import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 dark:bg-gray-800 text-base-content dark:text-white p-10 mt-auto">
      <nav>
        <h6 className="footer-title">Explore</h6>
        <a className="link link-hover">Gallery</a>
        <a className="link link-hover">Artists</a>
        <a className="link link-hover">Collections</a>
        <a className="link link-hover">Exhibitions</a>
      </nav>
      <nav>
        <h6 className="footer-title">About</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Press</a>
      </nav>
      <nav>
        <h6 className="footer-title">Follow Us</h6>
        <div className="grid grid-flow-col gap-4">
          {/* X Logo */}
            <a aria-label="X (Twitter)">
              <FaSquareXTwitter className="w-6 h-6" />
            </a>
          {/* YouTube */}
          <a aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
          {/* Facebook */}
          <a aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
