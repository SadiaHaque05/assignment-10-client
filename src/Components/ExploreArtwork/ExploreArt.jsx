import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Fade, Zoom } from "react-awesome-reveal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Loader from "../Loader/Loader";

const ExploreArt = () => {
  const [arts, setArts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/arts/all")
      .then((res) => res.json())
      .then((data) => {
        setArts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching arts:", err);
        setLoading(false); 
      });
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredArts = arts.filter(
    (art) =>
      (category === "All" || art.category === category) &&
      (art.title.toLowerCase().includes(searchTerm) ||
        art.artist.toLowerCase().includes(searchTerm))
  );

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <Zoom>
        <h1 className="text-4xl font-bold text-center mb-8">
          Explore All Artworks
        </h1>
      </Zoom>

      <div className="flex justify-center mb-8 gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered"
        >
          <option>All</option>
          <option>Painting</option>
          <option>Sketch</option>
          <option>Digital</option>
        </select>
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered"
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
                  ❤️ Likes: {art.likedBy?.length || 0}
                </p>
                <ReactTooltip
                  id={`like-${art._id}`}
                  place="bottom"
                  effect="solid"
                />

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

      {filteredArts.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No artworks found for “{searchTerm}” in category “{category}”.
        </p>
      )}
    </div>
  );
};

export default ExploreArt;
