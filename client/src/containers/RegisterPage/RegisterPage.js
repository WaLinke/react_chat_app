import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./RegisterPage.css";
import chatioIcon from "../../icons/chat-io-icon.jpg";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const RegisterPage = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    axios
      .post("/api/user/register", {
        username: username,
        email: email,
        password: password,
      })
      .then(
        (response) => {
          localStorage.setItem("x-access-token",response.headers["x-access-token"]);
          localStorage.setItem("user-id", response.data.user_id);
          localStorage.setItem("username", response.data.username);
          props.setIsConnected(true);
          history.push("/chat");
        },
        (error) => {
          setErrorMessage(error.response.data);
        }
      );
  };
  return (
    <div className="connexion-container">
      <div className="connexion-header">
        <div className="connexion-header-left-column"></div>
        <div className="connexion-header-center-column">
          <img
            className="connexion-header-icon"
            src={chatioIcon}
            alt="chat-io icon"
          />
        </div>
        <div className="connexion-header-right-column"></div>
      </div>

      <div className="connexion-main-container">
        <h1 className="connexion-main-title">
          Tout d'abord, saisissez votre adresse e-mail
        </h1>
        <h2 className="register-main-subtitle">
          Afin de créer votre compte, vous devez choisir votre nom d'utilisateur
          🦊🚀
        </h2>
        <form
          className="connexion-main-form"
          onSubmit={(event) => {
            event.preventDefault();
            register();
          }}
        >
          <input
            className="connexion-main-input"
            placeholder="username"
            onChange={(event) => {
              event.preventDefault();
              setUsername(event.target.value);
            }}
          ></input>
          <input
            className="connexion-main-input"
            placeholder="nom@email.com"
            onChange={(event) => {
              event.preventDefault();
              setEmail(event.target.value);
            }}
          ></input>
          <input
            className="connexion-main-input"
            type="password"
            placeholder="••••••••••"
            onChange={(event) => {
              event.preventDefault();
              setPassword(event.target.value);
            }}
          ></input>
          <button className="connexion-main-button" type="submit">
            Continuer
          </button>
        </form>
        <p className="connexion-error-message">{errorMessage}</p>
      </div>
    </div>
  );
};

export default RegisterPage;
