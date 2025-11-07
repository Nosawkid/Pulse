import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (auth && auth.accessToken) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default PublicRoute;
