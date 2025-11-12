import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Oops! Page Not Found</h2>
      <p className="mb-6 text-white/70">
        The page you are looking for does not exist or has been removed.
      </p>
      <Link to="/" className="btn btn-primary px-6 py-3 font-bold text-lg">
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
