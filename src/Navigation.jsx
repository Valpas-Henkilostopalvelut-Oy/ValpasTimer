import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Timer from "./containers/Timer/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import Login from "./containers/Login/index.jsx";
import Signup from "./containers/Singup/index.jsx";
import Settings from "./containers/Settings/index.jsx";
import Team from "./containers/Team/index.jsx";
import Workspaces from "./containers/Workspaces/index.jsx";
import Home from "./containers/Home/index.jsx";
import Reports from "./containers/Reports/index.jsx";
import Workers from "./containers/Workers/index.jsx";
import NoAccessPage from "./components/NoAccessPage/index.jsx";
import ForgotPassword from "./containers/ForgotPassword/index.jsx";
import TasksPage from "./containers/Work/index.jsx";
import Works from "./containers/Works/index.jsx";
import { History } from "./containers/History/index.jsx";
import { ConfirmPage } from "./containers/ConfirmPage/index.jsx";
import { AgreementAdminPanel } from "./containers/Agreement/AdminPanel/index.jsx";
import { AgreementPage } from "./containers/Agreement/index.jsx";
import { LandingPage } from "./containers/Landing/index.jsx";

const Navigation = ({ isAuthenticated, groups }) => {
  const Redirect = () => <Navigate replace to="/login" />;
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route exact path="login" element={!isAuthenticated ? <Login /> : <Navigate replace to="/home" />} />
      <Route exact path="signup" element={!isAuthenticated ? <Signup /> : <Navigate replace to="/home" />} />
      <Route exact path="confirm" element={!isAuthenticated ? <ConfirmPage /> : <Navigate replace to="/home" />} />
      <Route
        exact
        path="forgot-password"
        element={!isAuthenticated ? <ForgotPassword /> : <Navigate replace to="/home" />}
      />

      <Route exact path="history" element={isAuthenticated ? <History /> : <Redirect />} />
      <Route exact path="home" element={isAuthenticated ? <Home /> : <Redirect />} />
      <Route exact path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate replace to="/home" />} />
      <Route exact path="onboarding" element={isAuthenticated ? <AgreementPage /> : <Redirect />} />
      <Route exact path="work" element={isAuthenticated ? <TasksPage /> : <Redirect />} />
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
              <Reports />
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
        path="agreementadminpanel"
        element={
          isAuthenticated ? (
            groups.includes("Admins") || groups.includes("Clients") ? (
              <AgreementAdminPanel />
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

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Navigation;
