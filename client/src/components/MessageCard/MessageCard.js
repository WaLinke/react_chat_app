import React from "react";
import "./MessageCard.css";
import userIcon from "../../icons/user-icon.png";

const MessageCard = ({ message, username}) => {
  return (
    <div className="message-card-main-container">
      <div className="message-card-container">
        <img
          className="message-card-user-image"
          src={userIcon}
          alt="user-icon"
        />
        <div className="message-card-message-box">
          <div className="message-card-header">
            <p className="message-cart-user-name">{username}</p>
            <p className="message-card-time">
              {new Date().getHours()}:{new Date().getMinutes()}
            </p>
          </div>
          <div className="message-card-message">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
