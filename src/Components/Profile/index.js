import React, { useContext, useEffect, useState } from "react";
import { Divider, Modal, notification } from "antd";

import { Skeleton } from "antd";
import { clearWatchHistory, getUserInfo } from "../../Services/user";
import { AuthContext } from "../../AuthContext";
import "./style.css";

export default function Profile({ isProfileOpen, setIsProfileOpen }) {
  const { signout } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!isProfileOpen) return;
    
    getUserInfo().then((data) => {
      const words = data.name.trim().split(/\s+/);

      let imgText = words[0].charAt(0).toUpperCase();
      if (words.length > 1) {
        imgText += words[1].charAt(0).toUpperCase();
      }

      setUserInfo({ ...data, profileImgText: imgText.toUpperCase() });
    });
  }, [isProfileOpen]);

  const handleClearHistory = () => {
    clearWatchHistory()
      .then(() => notification.success({ message: "History cleared." }))
      .catch((err) =>
        notification.error({
          message: err.message,
        })
      )
      .finally(() => setIsProfileOpen(false));
  };

  return (
    <Modal
      open={isProfileOpen}
      onCancel={() => setIsProfileOpen(false)}
      footer={<div />}
      className="profile-modal"
    >
      <div className="profile">
        <div className="profile-details">
          {userInfo ? (
            <div className="profile-img">
              <div className="profile-img-text">{userInfo?.profileImgText}</div>
            </div>
          ) : (
            <Skeleton.Avatar rootClassName="profile-img-skeleton" />
          )}
          <div className="profile-info-header">Details</div>
          <div className="profile-info">
            <div className="profile-info-item">
              <div>Name</div>
              {userInfo ? (
                <div>{userInfo?.name}</div>
              ) : (
                <Skeleton.Input size="small" />
              )}
            </div>
            <Divider className="profile-divider" />
            <div className="profile-info-item">
              <div>Email</div>
              {userInfo ? (
                <div>{userInfo?.email}</div>
              ) : (
                <Skeleton.Input size="small" />
              )}
            </div>
            <Divider className="profile-divider" />
            <div className="profile-info-item">
              <div>Joined on</div>
              {userInfo ? (
                <div>{new Date(userInfo?.createdAt).toDateString()}</div>
              ) : (
                <Skeleton.Input size="small" />
              )}
            </div>
          </div>
          <div className="profile-action-header">Actions</div>
          <div className="profile-actions">
            <button
              className="profile-btn"
              disabled={!userInfo}
              onClick={handleClearHistory}
            >
              Clear Watch History
            </button>
            <button
              className="profile-btn"
              disabled={!userInfo}
              onClick={signout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
