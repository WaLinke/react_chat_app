import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ConnexionPage.css";
import chatioIcon from "../../icons/chat-io-icon.jpg";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const ConnexionPage = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    axios
      .post("/api/user/login", {
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
        <div className="connexion-header-right-column">
          <p className="connexion-header-discover">Vous découvrez Chat.io ? </p>
          <Link to="/register" className="connexion-header-create-account">
            Créer un compte
          </Link>
        </div>
      </div>

      <div className="connexion-main-container">
        <h1 className="connexion-main-title">Se connecter à Chat.io</h1>
        <h2 className="connexion-main-subtitle">
          Connectez vous avec votre adresse e-mail 🦊🚀
        </h2>
        <form
          className="connexion-main-form"
          onSubmit={(event) => {
            event.preventDefault();
            login();
          }}
        >
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
          <button
            className="connexion-main-button"
            type="submit"
          >
            Se connecter
          </button>
        </form>
        <p className="connexion-error-message">{errorMessage}</p>
        <div className="connexion-bottom">
          <p className="connexion-bottom-discover">Vous découvrez Chat.io ? </p>
          <Link to="/register" className="connexion-bottom-create-account">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnexionPage;
