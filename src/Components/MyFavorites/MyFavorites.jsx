import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../Firebase/Firebase.config";
import ArtCard from "../ArtCard/ArtCard";

const MyFavorites = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate("/auth/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://assignment-10-serverside-azure.vercel.app/users/${user.email}/favorites`
      )
        .then((res) => res.json())
        .then((data) => setFavorites(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleRemoveFavorite = (artId) => {
    fetch(
      `https://assignment-10-serverside-azure.vercel.app/arts/${artId}/unfavorite`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      }
    )
      .then(() => {
        setFavorites((prev) => prev.filter((art) => art._id !== artId));
      })
      .catch((err) => console.error(err));
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Favorite Artworks
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no favorite artworks yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((art) => (
            <div key={art._id} className="relative">
              <ArtCard art={art} />
              <button
                onClick={() => handleRemoveFavorite(art._id)}
                className="btn btn-error w-full mt-2"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
