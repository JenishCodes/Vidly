import React, { useRef } from "react";
import "./style.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Modal } from "antd";

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
          className="position-absolute"
          style={{ left: "32px", fontSize: "32px" }}
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
        frameborder="0"
      ></iframe>
    </Modal>
  );
}
