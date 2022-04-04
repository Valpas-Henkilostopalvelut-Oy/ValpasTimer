import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Timer from "./containers/Timer";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Singup";
import Settings from "./containers/Settings";
import Team from "./containers/Team";
import Workspaces from "./containers/Workspaces";
import WorkspaceSettings from "./containers/Workspaces/Settings";
import Home from "./containers/Home";
import Dashboard from "./containers/Reports";
import Workers from "./containers/Workers";

import { useAppContext } from "./services/contextLib";

const Navigation = () => {
  const { isAuthenticated } = useAppContext();

  const Redirect = () => <Navigate replace to="/login" />;
  return (
    <Routes>
      <Route
        exact
        path="login"
        element={
          !isAuthenticated ? <Login /> : <Navigate replace to="/timer" />
        }
      />
      <Route
        exact
        path="signup"
        element={
          !isAuthenticated ? <Signup /> : <Navigate replace to="/timer" />
        }
      />
      <Route exact path="/" element={<Navigate replace to="/home" />} />
      <Route
        exact
        path="timer"
        element={isAuthenticated ? <Timer /> : <Redirect />}
      />
      <Route
        exact
        path="home"
        element={isAuthenticated ? <Home /> : <Redirect />}
      />
      <Route
        exact
        path="settings"
        element={isAuthenticated ? <Settings /> : <Redirect />}
      />
      <Route
        exact
        path="workspaces"
        element={isAuthenticated ? <Workspaces /> : <Redirect />}
      />
      <Route
        exact
        path="workspaces/settings"
        element={isAuthenticated ? <WorkspaceSettings /> : <Redirect />}
      />
      <Route
        exact
        path="team"
        element={isAuthenticated ? <Team /> : <Redirect />}
      />
      <Route
        exact
        path="reports"
        element={isAuthenticated ? <Dashboard /> : <Redirect />}
      />
      <Route
        exact
        path="allworkers"
        element={isAuthenticated ? <Workers /> : <Redirect />}
      />
      <Route element={NotFound} />
    </Routes>
  );
};

export default Navigation;
