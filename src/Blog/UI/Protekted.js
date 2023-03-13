import React from "react";
import { Navigate } from "react-router-dom";
const Protected = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;