import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const ArtWorkDetails = () => {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/arts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArt(data);
        if (user?.email && data.favorites?.includes(user.email)) {
          setIsFavorite(true);
        }
      })
      .catch((err) => console.error(err));
  }, [id, user]);

  
  const handleLike = () => {
    if (!user) return alert("Please login to like the artwork");

    const endpoint = art.likedBy?.includes(user.email)
      ? `/arts/${id}/unlike`   
      : `/arts/${id}/like`;    

    fetch(`http://localhost:3000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
      .then(() => {
        setArt((prev) => {
          const likedSet = new Set(prev.likedBy || []);
          if (likedSet.has(user.email)) likedSet.delete(user.email);
          else likedSet.add(user.email);
          return { ...prev, likedBy: Array.from(likedSet) };
        });
      })
      .catch((err) => console.error(err));
  };

  const toggleFavorite = () => {
    if (!user) return alert("Please login to manage favorites");

    const endpoint = isFavorite
      ? `/arts/${id}/unfavorite`
      : `/arts/${id}/favorite`;

    fetch(`http://localhost:3000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
      .then(() => {
        setIsFavorite(!isFavorite); 
      })
      .catch((err) => console.error(err));
  };

  if (!art) return <p>Loading artwork...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <img
        src={art.image}
        alt={art.title}
        className="w-full max-h-[1200px] object-cover rounded-lg mb-5"
      />
      <h1 className="text-4xl font-bold mb-2">{art.title}</h1>
      <p className="text-gray-400 mb-2">{art.category} | {art.tools}</p>
      <p className="mb-4">{art.description}</p>
      <p className="text-gray-500 mb-4">
        Dimensions: {art.dimensions} | Price: ${art.price}
      </p>
      <p className="text-gray-600 mb-4">Artist: {art.artist}</p>
      <p className="text-gray-600 mb-4">
        Your Email: {user?.email || "Login to see email"}
      </p>
      <div className="flex gap-4">
        <button onClick={handleLike} className="btn btn-primary">
          {art.likedBy?.includes(user?.email) ? "Unlike" : "Like"} ({art.likedBy?.length || 0}) 
        </button>
        <button
          onClick={toggleFavorite}
          className={isFavorite ? "btn btn-error" : "btn btn-secondary"}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default ArtWorkDetails;