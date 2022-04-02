import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { AuthContext } from "../context";
import { resetPassword } from "../Services/auth";

export default function Forgot() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    resetPassword(email)
      .then(() => {
          setEmail("")
          setMessage("Password reset link has been sent to " + email)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Loader blur={true} />
  ) : user ? (
    <Navigate to="/" />
  ) : (
    <div className="container">
      {message ? (
        <div
          style={{ maxWidth: "350px" }}
          className="error mx-auto mt-5 d-flex align-items-center text-white bg-success px-3 py-2 rounded-3"
        >
          <div className="me-3 fs-5">
            <i className="fa fa-check-circle"></i>
          </div>
          <div className="fs-7">{message}</div>
        </div>
      ) : null}
      <div
        className="d-flex flex-column justify-content-between align-items-center mx-auto border mb-5 py-3 px-0 rounded-3"
        style={{
          maxWidth: "350px",
          marginTop: message ? "1rem" : "100px",
        }}
      >
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 w-100 bg-transparent my-2 text-white rounded-3"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            onClick={handleSubmit}
            className="btn hover p-2 w-100 my-3 border text-white rounded-pill"
          >
            Send Email
          </div>
        </form>
      </div>
    </div>
  );
}
