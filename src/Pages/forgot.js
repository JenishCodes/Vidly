import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";
import { changePassword, sendMailOTP } from "../Services/auth";
import { notification } from "antd";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOTPSent) {
      changePassword(email, OTP, password)
        .then(() =>
          notification.success({ message: "Password changed successfully" })
        )
        .catch((err) => notification.error({ message: err.message }))
        .finally(() => navigate("/signin"));
    } else {
      sendMailOTP(email)
        .then(() => {
          notification.success({ message: "OTP sent successfully" });
          setIsOTPSent(true);
        })
        .catch((err) => {
          if (err.message === "OTP already sent") {
            notification.info({ message: err.message });
            setIsOTPSent(true);
          } else {
            notification.error({ message: err.message });
          }
        });
    }
  };

  return (
    <div className="forgot">
      <div>
        <div className="form-container">
          <header>
            <h1 className="fw-700 c-white form-header">Forgot Password</h1>
          </header>
          <form className="form d-flex fd-column">
            <div className="form-field">
              <input
                className="o-none b-none bg-transparent c-white"
                type="email"
                placeholder="Email or mobile number"
                disabled={isOTPSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {isOTPSent && (
              <div className="form-field">
                <input
                  className="o-none b-none bg-transparent c-white"
                  type="password"
                  placeholder="New Password"
                  disabled={!isOTPSent}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            {isOTPSent && (
              <div className="form-field">
                <input
                  className="o-none b-none bg-transparent c-white"
                  type="text"
                  placeholder="OTP"
                  disabled={!isOTPSent}
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
            )}
            <button
              className="submit-btn b-none c-white fw-500"
              onClick={handleSubmit}
            >
              {isOTPSent ? "Change Password" : "Get OTP"}
            </button>
            <Link className="login-forgot-pass m-auto" to="/signin">
              Remembered Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
