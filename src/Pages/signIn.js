import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { AuthContext } from "../context";
import { login } from "../Services/auth";

export default function SignIn() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    login(email, password)
      .then(() => history("/"))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loader blur={true} />
  ) : user ? (
    <Navigate to="/" />
  ) : (
    <div className="container">
      {error ? (
        <div
          style={{ maxWidth: "350px" }}
          className="error mx-auto mt-5 d-flex align-items-center text-white bg-danger px-3 py-2 rounded-3"
        >
          <div className="me-3 fs-5">
            <i className="fa fa-exclamation-triangle"></i>
          </div>
          <div className="fs-7">{error}</div>
        </div>
      ) : null}
      <div
        className="d-flex flex-column justify-content-between align-items-center mx-auto border mb-5 py-3 px-0 rounded-3"
        style={{
          maxWidth: "350px",
          marginTop: error ? "1rem" : "100px",
        }}
      >
        <h1>Sign In</h1>
        <form>
          <input
            className="border p-2 w-100 bg-transparent my-2 text-white rounded-3"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 w-100 bg-transparent my-2 text-white rounded-3"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-end">
            <Link to="/forgot">Forgot Password?</Link>
          </div>
          <div
            onClick={handleSubmit}
            className="btn hover p-2 w-100 my-3 border text-white rounded-pill"
          >
            Sign In
          </div>
          <div className="text-center">
            <Link to="/register">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
