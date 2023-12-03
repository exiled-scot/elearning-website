import React from "react";
import { Route, Navigate } from "react-router-dom";
import { logout } from "../utils/auth.js";

const Logout = () => {
  logout();
  return <Navigate to="/" />;
};

export default Logout;
