import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Timer from "./containers/Timer";
import NotFound from "./components/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Singup";
import Settings from "./containers/Settings";
import Team from "./containers/Team";
import Workspaces from "./containers/Workspaces";
import Home from "./containers/Home";
import Reports from "./containers/Reports";
import Workers from "./containers/Workers";
import NoAccessPage from "./components/NoAccessPage";
import ForgotPassword from "./containers/ForgotPassword";
import TasksPage from "./containers/Work";
import Works from "./containers/Works";
import Profile from "./containers/Profile";
import History from "./containers/History";
import ConfirmPage from "./containers/ConfirmPage";
import AgreementAdminPanel from "./containers/Agreement/AdminPanel";
import AgreementPage from "./containers/Agreement";
import LandingPage from "./containers/Landing";
import Library from "./containers/Library";
import Receipt from "./containers/Receipt";

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
      <Route exact path="profile" element={isAuthenticated ? <Profile /> : <Redirect />} />
      <Route exact path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate replace to="/home" />} />
      <Route exact path="onboarding" element={isAuthenticated ? <AgreementPage /> : <Redirect />} />
      <Route exact path="work" element={isAuthenticated ? <TasksPage /> : <Redirect />} />
      <Route exact path="receipt" element={isAuthenticated ? <Receipt /> : <Redirect />} />
      <Route
        exact
        path="works"
        element={isAuthenticated ? groups.includes("Admins") ? <Works /> : <NoAccessPage /> : <Redirect />}
      />
      <Route
        exact
        path="dashboard"
        element={isAuthenticated ? groups.includes("Admins") ? <Library /> : <NoAccessPage /> : <Redirect />}
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
