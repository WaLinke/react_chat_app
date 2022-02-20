import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import "./ChatPage.css";
import SideView from "../../components/SideView/SideView";
import MessageView from "../../components/MessageView/MessageView";
import MessageInput from "../../components/MessageInput/MessageInput";

let socket;
const user_id = localStorage.getItem("user-id");
const username = localStorage.getItem("username");

const Chat = (props) => {
  const history = useHistory();

  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const ENDPOINT = "192.168.0.54:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("connect", () => {
      console.log("SOCKET IS ON");
      socket.emit("c-get-all-users", user_id);
    });

    socket.on("s-get-all-users", (users) => {
      setAllUsers(users);
    });

    socket.on("s-new-message", (data) => {
      console.log("message received : " + data.message);
      setMessages((messages) => [...messages, data]);
    });

    const data = {
      my_username: username,
      his_username: "everyone",
      socket_id: "everyone",
    };
    changeConversation(data);

  }, []);

  const changeConversation = (data) => {
    setConversation(data);
  }

  const sendMessage = () => {
    const data = {
      user_from: username, 
      user_to: conversation.his_username,
      socket_id: conversation.socket_id,
      message: message.substring(0,1024),
    };
    console.log(data);
    socket.emit("c-new-direct-message", data);

  };

  const disconnect = (event) => {
    socket.close();
    console.log("SOCKET IS OFF");

    localStorage.removeItem("x-access-token");
    localStorage.removeItem("user-id");
    localStorage.removeItem("username");
    props.setIsConnected(false);
    history.push("/connexion");
  };
  return (
    <div className="chat-container">
      <div className="chat-main-container">
        <SideView
          allUsers={allUsers}
          changeConversation={changeConversation}
          username={username}
          disconnect={disconnect}
        />
        <div className="chat-messages-container">
          <MessageView allUsers={allUsers} messages={messages} conversation={conversation} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
