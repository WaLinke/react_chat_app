import React from "react";
import "./MessageView.css";
import MessageCard from "../../components/MessageCard/MessageCard";

const MessageView = ({ allUsers, messages, conversation }) => {
  function shoudShowMessage(element) {
      console.log(element, conversation);
    if (
      (element.user_from === conversation.my_username &&
        element.user_to === conversation.his_username) ||
      (element.user_from === conversation.his_username &&
        element.user_to === conversation.my_username) ||
      (element.user_to === conversation.his_username &&
        element.user_to === "everyone" &&
        conversation.his_username === "everyone")
    ) {
      return true;
    }
    return false;
  }
  function getCurrentUser(element) {
    return element.username === conversation.his_username;
  }

  return (
    <div className="message-view-container">
      <div className="message-view-header">
        <h3 className="message-view-header-conv">
          {conversation.his_username === "everyone"
            ? "Groupe commun"
            : conversation.his_username}
        </h3>

        <div
          className={`status-dot ${
            allUsers.filter(getCurrentUser)[0] !== undefined &&
            allUsers.filter(getCurrentUser)[0].socket_id !== null
              ? "slider-green-dot"
              : "slider-red-dot"
          }`}
        ></div>
      </div>
      <div className="message-view-messages">
        {messages.filter(shoudShowMessage).map((message, index) => (
          <MessageCard
            key={index}
            message={message.message}
            username={message.user_from}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageView;
