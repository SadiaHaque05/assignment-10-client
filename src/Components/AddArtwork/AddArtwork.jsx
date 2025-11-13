import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { Tooltip as ReactTooltip } from "react-tooltip";

const AddArtwork = () => {
  const [artwork, setArtwork] = useState({
    image: "",
    title: "",
    category: "",
    tools: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "Public",
    artistName: "",
    artistEmail: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setArtwork({
          image: "",
          title: "",
          category: "",
          tools: "",
          description: "",
          dimensions: "",
          price: "",
          visibility: "Public",
          artistName: currentUser.displayName || "Anonymous",
          artistEmail: currentUser.email,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") setArtwork({ ...artwork, image: value });
    else if (name === "title") setArtwork({ ...artwork, title: value });
    else if (name === "category") setArtwork({ ...artwork, category: value });
    else if (name === "tools") setArtwork({ ...artwork, tools: value });
    else if (name === "description")
      setArtwork({ ...artwork, description: value });
    else if (name === "dimensions")
      setArtwork({ ...artwork, dimensions: value });
    else if (name === "price") setArtwork({ ...artwork, price: value });
    else if (name === "visibility")
      setArtwork({ ...artwork, visibility: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !artwork.image ||
      !artwork.title ||
      !artwork.category ||
      !artwork.tools ||
      !artwork.description
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch(
        "https://assignment-10-serverside-azure.vercel.app/arts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artwork),
        }
      );
      const data = await res.json();
      if (data.insertedId) {
        toast.success("Artwork added successfully!");
        setArtwork({
          image: "",
          title: "",
          category: "",
          tools: "",
          description: "",
          dimensions: "",
          price: "",
          visibility: "Public",
          artistName: user.displayName,
          artistEmail: user.email,
        });
      }
    } catch (err) {
      toast.error("Failed to add artwork");
      console.error(err);
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mb-8 p-6 bg-base-200 dark:bg-base-300 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center dark:text-secondary">
        Add Artwork
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="image"
          value={artwork.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          data-tip="Enter the URL of your artwork image"
          required
        />
        <input
          type="text"
          name="title"
          value={artwork.title}
          onChange={handleChange}
          placeholder="Title"
          className="input input-bordered w-full"
          data-tip="Enter a catchy title for your artwork"
          required
        />
        <input
          type="text"
          name="category"
          value={artwork.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
          data-tip="Category of your artwork, e.g., Painting, Sketch"
          required
        />
        <input
          type="text"
          name="tools"
          value={artwork.tools}
          onChange={handleChange}
          placeholder="Medium / Tools"
          className="input input-bordered w-full"
          data-tip="Tools or medium used for this artwork"
          required
        />
        <textarea
          name="description"
          value={artwork.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          data-tip="Write a short description about your artwork"
          required
        />
        <input
          type="text"
          name="dimensions"
          value={artwork.dimensions}
          onChange={handleChange}
          placeholder="Dimensions (optional)"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="price"
          value={artwork.price}
          onChange={handleChange}
          placeholder="Price (optional)"
          className="input input-bordered w-full"
        />
        <select
          name="visibility"
          value={artwork.visibility}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option>Public</option>
          <option>Private</option>
        </select>
        <input
          type="text"
          value={artwork.artistName}
          readOnly
          className="input input-bordered w-full bg-secondary dark:primary"
        />
        <input
          type="text"
          value={artwork.artistEmail}
          readOnly
          className="input input-bordered w-full bg-primary dark:bg-secondary"
        />
        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Artwork
        </button>
      </form>
      <ReactTooltip effect="solid" />
    </div>
  );
};

export default AddArtwork;
