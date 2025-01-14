import React from "react";

export default function ForgotPassword() {
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
              Forgot Password
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
              />
            </div>

            <button
              className="login-btn b-none c-white fw-500"
              style={{
                fontSize: "1rem",
                minHeight: "2.5rem",
                padding: "0.375rem 1rem",
                borderRadius: "0.25rem",
                transitionTimingFunction: "cubic-bezier(0.32,0.94,0.6,1)",
                transitionDuration: "250ms",
                transitionProperty: "background-color,border-color",
              }}
            >
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
