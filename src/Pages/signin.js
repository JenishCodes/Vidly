import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { notification } from "antd";

export default function SignIn() {
  const { signin } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    
    setLoading(true);
    signin(email, password);
    setLoading(false);
  };

  return (
    <div className="signin">
      <div style={{ margin: "50px auto", maxWidth: "450px", padding: "0 5%" }}>
        <div
          style={{
            padding: "48px 68px",
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: "4px",
          }}
        >
          <header>
            <h1
              className="fw-700 c-white"
              style={{
                margin: "0 0 28px 0",
                fontSize: "2rem",
              }}
            >
              Sign In
            </h1>
          </header>
          <form className="flex fd-column" style={{ gap: "16px" }}>
            <div
              style={{
                padding: "1rem",
                border: "solid 1px rgba(128,128,128,0.7)",
                borderRadius: "0.25rem",
                minWidth: "12.5rem",
                background: "rgba(22,22,22,0.7)",
                outline: "solid 2px white",
              }}
            >
              <input
                className="o-none b-none bg-transparent c-white"
                type="email"
                style={{
                  fontSize: "1rem",
                }}
                placeholder="Email or mobile number"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div
              style={{
                padding: "1rem",
                border: "solid 1px rgba(128,128,128,0.7)",
                borderRadius: "0.25rem",
                minWidth: "12.5rem",
                background: "rgba(22,22,22,0.7)",
                outline: "solid 2px white",
              }}
            >
              <input
                className="o-none b-none bg-transparent c-white"
                type="password"
                style={{
                  fontSize: "1rem",
                }}
                placeholder="Password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            <button
              className="login-btn b-none fw-500 c-white"
              style={{
                fontSize: "1rem",
                minHeight: "2.5rem",
                padding: "0.375rem 1rem",
                borderRadius: "0.25rem",
                transitionTimingFunction: "cubic-bezier(0.32,0.94,0.6,1)",
                transitionDuration: "250ms",
                transitionProperty: "background-color,border-color",
              }}
              disabled={loading}
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <a className="login-forgot-pass m-auto" href="/forgot-password">
              Forgot Password?
            </a>
          </form>
          <footer style={{ marginTop: "20px" }}>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>
              New to Vidly?{" "}
              <a href="/signup" className="c-white fw-500 td-none">
                Sign up now.
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
