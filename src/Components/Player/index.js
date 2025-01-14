import React, { useRef } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import "./style.css";

export default function Player({ currentPlaying, updateCurrentPlaying }) {
  const frame = useRef(null);

  return (
    <Modal
      className="player"
      open={currentPlaying !== null}
      footer={null}
      width={"100%"}
      height={"100%"}
      closeIcon={null}
    >
      <div className="controllers h-100 w-100">
        <ArrowLeftOutlined
          className="position-absolute go-back-icon"
          onClick={() => {
            updateCurrentPlaying(null, null, null);
            frame.current.src = "";
          }}
        />
        <h1 className="m-0 justify-content-center">{currentPlaying?.title}</h1>
      </div>
      <iframe
        src={currentPlaying?.trailer + "?autoplay=1&controls=0&rel=0"}
        ref={frame}
        title="Movie"
        frameborder="0"
      ></iframe>
    </Modal>
  );
}
