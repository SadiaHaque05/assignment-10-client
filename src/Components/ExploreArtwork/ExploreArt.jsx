import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Fade, Zoom } from "react-awesome-reveal";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ExploreArt = () => {
  const [arts, setArts] = useState([]);
  const [filteredArts, setFilteredArts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/arts/all")
      .then((res) => res.json())
      .then((data) => {
        setArts(data);
        setFilteredArts(data);
      })
      .catch((err) => console.error("Error fetching arts:", err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = arts.filter(
      (art) =>
        art.title?.toLowerCase().includes(value) ||
        art.artist?.toLowerCase().includes(value)
    );
    setFilteredArts(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <Zoom>
        <h1 className="text-4xl font-bold text-center mb-8">
          Explore All Artworks
        </h1>
      </Zoom>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <Fade cascade damping={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArts.map((art) => (
            <div
              key={art._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200"
            >
              <figure>
                <img
                  src={art.image}
                  alt={art.title}
                  className="h-60 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2
                  className="card-title"
                  data-tip={`By ${art.artist}`}
                  data-for={`tooltip-${art._id}`}
                >
                  {art.title}
                </h2>
                <ReactTooltip
                  id={`tooltip-${art._id}`}
                  place="top"
                  effect="solid"
                />
                <p>Artist: {art.artist}</p>
                <p>Category: {art.category}</p>
                <p data-tip="Total Likes ❤️" data-for={`like-${art._id}`}>
                  ❤️ Likes: {art.likes || 0}
                </p>
                <ReactTooltip id={`like-${art._id}`} place="bottom" effect="solid" />

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/art/${art._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fade>

      {/*  No Results */}
      {filteredArts.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No artworks found for “{searchTerm}”.
        </p>
      )}
    </div>
  );
};

export default ExploreArt;