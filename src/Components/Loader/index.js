import React from "react";
import "./style.css";

export default function Loader(props) {
  return (
    <div
      className="overlay"
      style={{
        background: props.blur ? "rgba(255,255,255,0.6)" : "transparent",
      }}
    >
      <div className="loading"></div>
    </div>
  );
}
