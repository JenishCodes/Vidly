import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../AuthContext";
import "./style.css";

export default function SignUp() {
  const { signup } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    signup(name, email, password);
    setLoading(false);
  };

  return (
    <div className="signup">
      <div>
        <div className="form-container">
          <header>
            <h1 className="fw-700 c-white form-header">Join Vidly</h1>
          </header>
          <form className="form d-flex fd-column">
            <div className="form-field">
              <input
                className="o-none b-none bg-transparent c-white"
                type="text"
                placeholder="Name"
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
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
              onClick={handleSignUp}
            >
              Join Now
            </button>
          </form>
          <footer className="form-footer">
            <p>
              Already a memeber?{" "}
              <Link className="fw-500 c-white td-none" to="/signin">
                Sign in.
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
