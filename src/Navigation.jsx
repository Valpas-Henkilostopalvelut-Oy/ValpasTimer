import React from "react";
import { Route, Switch } from "react-router-dom";
import Timer from "./containers/Timer";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Singup";
import Settings from "./containers/Settings";

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/timer">
        <Timer />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Navigation;
