import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";

const MyGallery = () => {
  const [user, setUser] = useState(null);
  const [arts, setArts] = useState([]);
  const [editingArt, setEditingArt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", image: "", category: "", description: "", visibility: "Public" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/arts?userEmail=${user.email}`)
        .then(res => res.json())
        .then(data => setArts(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this artwork?")) return;
    fetch(`http://localhost:3000/arts/${id}`, { method: "DELETE" })
      .then(() => {
        setArts(arts.filter(a => a._id !== id));
        toast.success("Deleted successfully!");
      });
  };

  const handleEdit = (art) => {
    setEditingArt(art);
    setFormData({ title: art.title, image: art.image, category: art.category, description: art.description, visibility: art.visibility });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/arts/${editingArt._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).then(() => {
      setArts(arts.map(a => a._id === editingArt._id ? { ...a, ...formData } : a));
      setModalOpen(false);
      toast.success("Updated successfully!");
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arts.map(art => (
          <div key={art._id} className="card bg-base-200 shadow p-4">
            <img src={art.image} alt={art.title} className="w-full h-48 object-cover mb-2 rounded" />
            <h2 className="font-bold">{art.title}</h2>
            <p>{art.category}</p>
            <div className="flex justify-between mt-2">
              <button className="btn btn-sm btn-primary" onClick={() => handleEdit(art)}>Update</button>
              <button className="btn btn-sm btn-error" onClick={() => handleDelete(art._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-base-100 p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Update Artwork</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="input input-bordered w-full" />
              <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="input input-bordered w-full" />
              <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="input input-bordered w-full" />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="textarea textarea-bordered w-full" />
              <select name="visibility" value={formData.visibility} onChange={handleChange} className="select select-bordered w-full">
                <option>Public</option>
                <option>Private</option>
              </select>
              <div className="flex justify-end gap-3 mt-3">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGallery;
