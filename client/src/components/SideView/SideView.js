import React from "react";
import "./SideView.css";
import userIcon from "../../icons/user-icon.png";

const SideView = (props) => {
  function shouldShowUser(element) {
    return element.username !== props.username;
  }
  return (
    <div className="slider-container">
      <p className="slider-user-title">Liste des groupes</p>
      <div className="slider-all-conversations">

      <div className="slider-users-buttons">
        <button
          className="slider-user-button"
          onClick={(event) => {
            event.preventDefault();
            const data = {
              my_username: props.username,
              his_username: "everyone",
              socket_id: "everyone",
            };
            props.changeConversation(data);
          }}
        >
          <div className="slider-dot slider-green-dot"></div>

          <img className="slider-user-image" src={userIcon} alt="user-icon" />
          <p className="slider-user-name">
            Tout le monde
          </p>
        </button>
      </div>

      <p className="slider-user-title">Liste des utilisateurs</p>
      <div className="slider-users-buttons">
        {props.allUsers.filter(shouldShowUser).map((user, index) => (
          <button
            className="slider-user-button"
            key={index}
            onClick={(event) => {
              event.preventDefault();
              const data = {
                my_username: props.username,
                his_username: user.username,
                socket_id: user.socket_id,
              };
              props.changeConversation(data);
            }}
          >
            <div
              className={`slider-dot ${
                user.socket_id !== null ? "slider-green-dot" : "slider-red-dot"
              }`}
            ></div>

            <img className="slider-user-image" src={userIcon} alt="user-icon" />
            <p className="slider-user-name">
              {user.username}
            </p>
          </button>
        ))}
      </div>
      </div>
      <button
        className="slider-disconnect-button"
        onClick={(event) => {
          event.preventDefault();
          props.disconnect();
        }}
      >
        🦊 Se déconnecter 👋
      </button>
    </div>
  );
};

export default SideView;
