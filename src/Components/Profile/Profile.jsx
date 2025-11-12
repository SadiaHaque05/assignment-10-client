import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { auth } from "../Firebase/Firebase.config";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate("/auth/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  if (!user) return null;

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body text-center">
          <img src={user.photoURL || "https://img.icons8.com/color/48/000000/user-male-circle.png"} alt="User" className="h-20 w-20 rounded-full mx-auto" />
          <h2 className="font-bold text-xl">{user.displayName || "Profile"}</h2>
          <p className="text-white/80">{user.email}</p>
           <button onClick={() => navigate("/profile/update")} className="btn btn-primary mt-2 w-full">
            Update Profile
          </button>
          <button onClick={handleLogout} className="btn btn-neutral mt-4 w-full">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
