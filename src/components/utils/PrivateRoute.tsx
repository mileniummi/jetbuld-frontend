import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../lib/hooks/redux";

const PrivateRoute = () => {
  // Add your own authentication on the below line.
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
