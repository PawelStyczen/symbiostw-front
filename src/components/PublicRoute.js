// components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
