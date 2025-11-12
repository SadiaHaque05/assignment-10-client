import React from "react";
import { Link } from "react-router";

const ArtCard = ({ art }) => {
  return (
    <div className="bg-base-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-center items-center p-4">
        <img
          src={art.image}
          alt={art.title}
          className="w-full h-60 rounded-lg"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-primary dark:text-primary mb-2">
          {art.title}
        </h3>
        <p className="text-base-content dark:text-gray-300 mb-1">
          <span className="font-semibold">Artist:</span> {art.artist}
        </p>
        <p className="text-base-content dark:text-gray-400 mb-3">
          <span className="font-semibold">Category:</span> {art.category}
        </p>
        <Link to={`/art/${art._id}`} className="btn btn-primary w-full">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ArtCard;
