import React from "react";
import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PaperClipOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";

import "./style.css";

export default function Footer() {
  return (
    <footer className="footer l-height-1-2">
      <Popover
        placement="top"
        content={
          <div>
            <span className="social-icon-wrapper">
              <LinkedinOutlined
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/jenish-padodara-1020/"
                  )
                }
                className="social-icon"
              />
            </span>
            <span className="social-icon-wrapper">
              <GithubOutlined
                onClick={() =>
                  window.open("https://www.github.com/JenishCodes")
                }
                className="social-icon"
              />
            </span>
            <span className="social-icon-wrapper">
              <PaperClipOutlined
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1szWf3-_1Ckr-rcu1lSGspr3Te5PX7j2i/view?usp=drive_link"
                  )
                }
                className="social-icon"
              />
            </span>
            <span className="social-icon-wrapper">
              <TwitterOutlined
                onClick={() =>
                  window.open("https://twitter.com/JenishPadodara")
                }
                className="social-icon"
              />
            </span>
            <span className="social-icon-wrapper">
              <InstagramOutlined
                className="social-icon"
                onClick={() =>
                  window.open("https://www.instagram.com/jenish_1020/")
                }
              />
            </span>
            <span className="social-icon-wrapper">
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
    </footer>
  );
}
