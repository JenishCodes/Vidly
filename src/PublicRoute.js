import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PublicRoute({ children }) {
  const { isUserSignedIn } = useAuth();

  return isUserSignedIn ? (
    <Navigate to="/" />
  ) : (
    <div>
      <div
        className="overlay"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_small.jpg')",
          position: "absolute",
          width: "100%",
          height: "100vh",
          zIndex: -1,
          backgroundSize: "cover",
          display: "block",
          opacity: 0.5,
        }}
      ></div>
      <div className="login-header" style={{}}>
        <div
          style={{
            maxWidth: "calc(83.33333333333334% - (3rem * 2))",
            padding: "1.5rem 3rem",
            margin: "auto",
          }}
        >
          <h1
            className="title"
            style={{
              marginRight: "25px",
              margin: "0px 25px 0px 0px",
              lineHeight: 1,
              fontSize: "48px",
            }}
          >
            Vidly
          </h1>
        </div>
      </div>
      {children}
    </div>
  );
}

export default PublicRoute;
