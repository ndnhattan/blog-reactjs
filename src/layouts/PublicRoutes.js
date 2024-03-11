import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = localStorage.getItem("access_token") || false;

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
