import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import Loader from "../Loader/Loader";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <Loader></Loader>;

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
};

export default PrivateRoute;
