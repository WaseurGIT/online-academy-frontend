import React, { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;