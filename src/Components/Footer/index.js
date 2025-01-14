import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PaperClipOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import React from "react";
import "./style.css";

export default function Footer() {
  return (
    <footer
      className="footer l-height-1-2"
      style={{
        margin: "20px auto",
        color: "grey",
      }}
    >
      <div
        style={{
          fontSize: "12px",
        }}
      >
        <Popover
          placement="top"
          content={
            <div>
              <span style={{ margin: "0 7px" }}>
                <LinkedinOutlined
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/jenish-padodara-1020/"
                    )
                  }
                  className="social-icon"
                />
              </span>
              <span style={{ margin: "0 7px" }}>
                <GithubOutlined
                  onClick={() =>
                    window.open("https://www.github.com/JenishCodes")
                  }
                  className="social-icon"
                />
              </span>
              <span style={{ margin: "0 7px" }}>
                <PaperClipOutlined
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/1szWf3-_1Ckr-rcu1lSGspr3Te5PX7j2i/view?usp=drive_link"
                    )
                  }
                  className="social-icon"
                />
              </span>
              <span style={{ margin: "0 7px" }}>
                <TwitterOutlined
                  onClick={() =>
                    window.open("https://twitter.com/JenishPadodara")
                  }
                  className="social-icon"
                />
              </span>
              <span style={{ margin: "0 7px" }}>
                <InstagramOutlined className="social-icon" />
              </span>
              <span style={{ margin: "0 7px" }}>
                <MailOutlined
                  className="social-icon"
                  onClick={() => window.open("mailto:padodara.1020@gmail.com")}
                />
              </span>
            </div>
          }
        >
          <p>&copy; Made by Nerd Guy</p>
        </Popover>
      </div>
    </footer>
  );
}
