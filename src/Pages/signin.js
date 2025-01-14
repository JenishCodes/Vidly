import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../AuthContext";
import "./style.css";

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
      <div>
        <div className="form-container">
          <header>
            <h1 className="fw-700 c-white form-header">Sign In</h1>
          </header>
          <form className="form d-flex fd-column">
            <div className="form-field">
              <input
                className="o-none b-none bg-transparent c-white"
                type="email"
                placeholder="Email or mobile number"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="form-field">
              <input
                className="o-none b-none bg-transparent c-white"
                type="password"
                placeholder="Password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            <button
              className="submit-btn b-none fw-500 c-white"
              disabled={loading}
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <Link className="login-forgot-pass m-auto" to="/forgot-password">
              Forgot Password?
            </Link>
          </form>
          <footer className="form-footer">
            <p>
              New to Vidly?{" "}
              <Link to="/signup" className="c-white fw-500 td-none">
                Sign up now.
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
