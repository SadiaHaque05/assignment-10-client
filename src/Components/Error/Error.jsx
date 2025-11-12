import React from "react";
import { Link } from "react-router";
import errorImg from "../../assets/girl error.jpg"

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <img className="h-[450px] w-[450px] rounded-4xl" src={errorImg} alt="" />
      <h2 className="text-3xl mt-3 mb-6">Oops! Page Not Found</h2>
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
