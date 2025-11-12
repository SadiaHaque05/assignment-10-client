import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-gray-800 text-base-content p-10">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M23 2.999a10.61 10.61 0 0 1-2.99.82 5.18 5.18 0 0 0 2.27-2.85 10.32 10.32 0 0 1-3.28 1.25 5.15 5.15 0 0 0-8.78 4.7 14.62 14.62 0 0 1-10.63-5.39 5.15 5.15 0 0 0 1.59 6.87 5.11 5.11 0 0 1-2.33-.64v.06a5.15 5.15 0 0 0 4.13 5.05 5.18 5.18 0 0 1-2.32.09 5.15 5.15 0 0 0 4.81 3.57 10.32 10.32 0 0 1-6.4 2.21c-.42 0-.83-.02-1.24-.07a14.56 14.56 0 0 0 7.88 2.31c9.46 0 14.63-7.84 14.63-14.63 0-.22 0-.44-.02-.66A10.43 10.43 0 0 0 23 2.998z" />
              </svg>
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
    </div>
  );
};

export default Footer;
