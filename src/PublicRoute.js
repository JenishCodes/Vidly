import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./App.css";

function PublicRoute({ children }) {
  const { isUserSignedIn } = useAuth();

  return isUserSignedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="auth-layout">
      <div className="overlay" />
      <div className="auth-header">
        <h1 className="title">Vidly</h1>
      </div>
      {children}
    </div>
  );
}

export default PublicRoute;
