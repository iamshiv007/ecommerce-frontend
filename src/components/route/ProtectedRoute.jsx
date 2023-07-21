import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component, isAdmin }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  } else if (isAdmin && user?.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return <>{component}</>;
};
