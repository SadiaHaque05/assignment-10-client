import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { MdPalette } from "react-icons/md";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { FaSun, FaMoon } from "react-icons/fa"; 

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore All Artworks", path: "/exploreArt" },
    { name: "Add Artwork", path: "/addArt" },
    { name: "My Gallery", path: "/myGallery" },
    { name: "My Favorites", path: "/myFavorites" },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.reload().then(() => setUser(auth.currentUser));
      } else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* start */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1">
          <Link to="/"><MdPalette size={24} /></Link>
          <p className="font-extrabold text-center text-2xl">ArtVerse</p>
        </div>
      </div>

      {/* center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-bold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink to={link.path}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* end */}
      <div className="navbar-end flex items-center gap-2">
        <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>

        {user ? (
          <>
            <Link to="/profile">
              <img
                src={user.photoURL || "https://img.icons8.com/color/48/000000/user-male-circle.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            </Link>
            <button onClick={() => signOut(auth)} className="btn btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-primary font-extrabold">Login</Link>
            <Link to="/auth/register" className="btn btn-secondary font-extrabold">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
