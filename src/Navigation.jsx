import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Timer from "./containers/Timer";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Singup";
import Settings from "./containers/Settings";
import Team from "./containers/Team";
import Workspaces from "./containers/Workspaces";
import Home from "./containers/Home";
import Dashboard from "./containers/Reports";
import Workers from "./containers/Workers";
import NoAccessPage from "./containers/NoAccessPage";
import ForgotPassword from "./containers/ForgotPassword";
import Tasks from "./containers/Tasks";
import Works from "./containers/Works";

const Navigation = ({ isAuthenticated, groups }) => {
  const Redirect = () => <Navigate replace to="/login" />;
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route exact path="login" element={!isAuthenticated ? <Login /> : <Navigate replace to="/home" />} />
      <Route exact path="signup" element={!isAuthenticated ? <Signup /> : <Navigate replace to="/home" />} />
      <Route
        exact
        path="forgot-password"
        element={!isAuthenticated ? <ForgotPassword /> : <Navigate replace to="/home" />}
      />

      <Route exact path="home" element={isAuthenticated ? <Home /> : <Redirect />} />
      <Route exact path="/" element={<Navigate replace to="/home" />} />
      <Route exact path="tasks" element={isAuthenticated ? <Tasks /> : <Redirect />} />
      <Route
        exact
        path="works"
        element={isAuthenticated ? groups.includes("Admins") ? <Works /> : <NoAccessPage /> : <Redirect />}
      />
      <Route
        exact
        path="timer"
        element={
          isAuthenticated ? (
            groups.includes("Workers") || groups.includes("Admins") || groups.includes("Clients") ? (
              <Timer />
            ) : (
              <NoAccessPage />
            )
          ) : (
            <Redirect />
          )
        }
      />
      <Route exact path="settings" element={isAuthenticated ? <Settings /> : <Redirect />} />
      <Route
        exact
        path="workspaces"
        element={isAuthenticated ? groups.includes("Admins") ? <Workspaces /> : <NoAccessPage /> : <Redirect />}
      />
      <Route
        exact
        path="allworkers"
        element={isAuthenticated ? groups.includes("Admins") ? <Workers /> : <NoAccessPage /> : <Redirect />}
      />
      <Route
        exact
        path="team"
        element={
          isAuthenticated ? (
            groups.includes("Admins") || groups.includes("Clients") ? (
              <Team />
            ) : (
              <NoAccessPage />
            )
          ) : (
            <Redirect />
          )
        }
      />
      <Route
        exact
        path="reports"
        element={
          isAuthenticated ? (
            groups.includes("Admins") || groups.includes("Clients") ? (
              <Dashboard />
            ) : (
              <NoAccessPage />
            )
          ) : (
            <Redirect />
          )
        }
      />
    </Routes>
  );
};

export default Navigation;
