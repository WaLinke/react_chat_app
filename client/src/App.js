import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Connexion from "./containers/ConnexionPage/ConnexionPage";
import Register from "./containers/RegisterPage/RegisterPage";
import Chat from "./containers/ChatPage/ChatPage";

const App = () => {
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("x-access-token") == null ? false : true
  );

  if (!isConnected) {
    return (
      <Router>
        <Switch>
          <Route
            path="/connexion"
            render={() => <Connexion setIsConnected={setIsConnected} />}
          />
          <Route
            path="/register"
            render={() => <Register setIsConnected={setIsConnected} />}
          />
          <Redirect to="/connexion" />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route
            path="/chat"
            render={() => <Chat setIsConnected={setIsConnected} />}
          />
          <Redirect to="/chat" />
        </Switch>
      </Router>
    );
  }
};

export default App;
