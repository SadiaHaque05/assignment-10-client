import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import ArtCard from "../ArtCard/ArtCard";
import { useNavigate } from "react-router";

const Home = () => {
  const [arts, setArts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/arts")
      .then((res) => res.json())
      .then((data) => setArts(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <section className="overflow-hidden">
        <Banner></Banner>
      </section>

      <section className="max-w-7xl mx-auto py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
          {arts.map((art) => (
            <ArtCard key={art._id} art={art} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/exploreArt")}
            className="btn btn-primary px-6 py-3 text-lg"
          >
            Explore All Artworks
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
