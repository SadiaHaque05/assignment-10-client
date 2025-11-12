import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { MdPalette } from "react-icons/md";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.reload().then(() => setUser(auth.currentUser));
      } else setUser(null);
    });

    return () => unsubscribe();
  }, []);
  const links = [
    <li  key="home">
      <NavLink to="/">Home</NavLink>
    </li>,
    <li key="explore">
      <NavLink to="/exploreArt">Explore Artworks</NavLink>
    </li>,
    <li key="add">
      <NavLink to="/addArt">Add Artwork</NavLink>
    </li>,
    <li  key="gallery">
      <NavLink to="/myGallery">My Gallery</NavLink>
    </li>,
    <li key="favorites">
      <NavLink to="/myFavorites">My Favorites</NavLink>
    </li>,
  ];
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <div className="flex items-center gap-1">
            <Link to="/">
              <MdPalette size={24} />
            </Link>
            <p className="font-extrabold text-center text-2xl">
              Art<span className="text-secondary">V</span>erse
            </p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-bold">{links}</ul>
        </div>

          {/* button */}
          
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={
                    user.photoURL ||
                    "https://img.icons8.com/color/48/000000/user-male-circle.png"
                  }
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
              </Link>
              <button
                onClick={() => signOut(auth)}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-primary font-extrabold">
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-secondary font-extrabold"
              >
                Register
              </Link>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
