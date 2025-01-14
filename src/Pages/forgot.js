import React from "react";

import "./style.css";

export default function ForgotPassword() {
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
              />
            </div>
            <button className="submit-btn b-none c-white fw-500">
              Send Mail
            </button>
            <a className="login-forgot-pass m-auto" href="/signin">
              Remembered Password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
