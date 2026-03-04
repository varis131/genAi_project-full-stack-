import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

import React from "react";

const Protected = () => {
  const { loading, user } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div>Protected</div>;
};

export default Protected;
