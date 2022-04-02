import React, { useState } from "react";
import "./style.css";

export default function ProgressBar(props) {
  const [size] = useState(props.size);
  const [progress] = useState(props.progress);
  const [tip] = useState(props.tip);

  return (
    <div className="circular-progress">
      <svg className="svg" width={size} height={size}>
        <circle
          className="svg-circle"
          stroke="#191919"
          cx={0.5 * size}
          cy={0.5 * size}
          r={0.475 * size}
          strokeWidth={0.05 * size}
        />
        <circle
          className="svg-circle"
          stroke="#0f79af"
          cx={0.5 * size}
          cy={0.5 * size}
          r={0.475 * size}
          strokeWidth={0.05 * size}
          strokeDasharray={0.95 * size * Math.PI}
          strokeDashoffset={((100 - progress) * 0.95 * size * Math.PI) / 100}
        />
      </svg>
      <div className="svg-circle-text" style={{ fontSize: `${size / 50}rem` }}>
        {progress}%<span className="tool-tip">{tip}</span>
      </div>
    </div>
  );
}
