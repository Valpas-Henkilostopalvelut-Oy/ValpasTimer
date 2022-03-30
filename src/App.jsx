import React, { useEffect, useState } from "react";
import "./App.css";

//Custom
import { Navbar, Nav } from "react-bootstrap";
import Navigation from "./Navigation";
import { AppContext } from "./services/contextLib";
import { Auth, DataStore, Hub } from "aws-amplify";
import { onError } from "./services/errorLib";
import WorkspaceSelect from "./components/WorkSpaceSelect";
import Sidebar from "./components/Sidebar";
import { LinkContainer } from "react-router-bootstrap";
import Profile from "./components/Profile";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const [admin, setAdmin] = useState(false);
  const [editor, setEditor] = useState(false);
  const [applicant, setAplicant] = useState(false);

  Hub.listen("auth", async (data) => {
    switch (data.payload.event) {
      case "signOut":
        await DataStore.clear();
        setAdmin(false);
        setEditor(false)
        setAplicant(false)
        break;
      case "signIn":
        await DataStore.start();
        break;
    }
  });

  useEffect(() => {
    const onLoad = async () => {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      } catch (e) {
        if (e !== "No current user") {
          onError(e);
        }
      }
      setIsAuthenticating(false);
    };

    onLoad();
  }, []);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];

        groups !== undefined && setAdmin(groups.includes("Admins"));
      } catch (error) {
        onError(error);
      }
    };

    const loadEditor = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];

        groups !== undefined && setEditor(groups.includes("Editors"));
      } catch (error) {
        onError(error);
      }
    };

    const loadApplicant = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];

        groups !== undefined && setAplicant(groups.includes("Applicants"));
      } catch (error) {
        onError(error);
      }
    };

    isAuthenticated && loadAdmin();
    isAuthenticated && loadEditor();
    isAuthenticated && loadApplicant();
  }, [isAuthenticated]);

  return (
    !isAuthenticating && (
      <div className="App">
        <AppContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
            selectedOption,
            setSelectedOption,
            admin,
            setAdmin,
            editor,
            setEditor,
            applicant,
            setAplicant,
          }}
        >
          <Navbar collapseOnSelect bg="light" expand="md">
            <LinkContainer to="home">
              <Navbar.Brand className="font-weight-bold text-muted">
                Valpas tracker
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav activeKey={window.location.pathname}>
                {isAuthenticated ? (
                  <>
                    <WorkspaceSelect />
                    <Profile />
                  </>
                ) : (
                  <>
                    <LinkContainer to="signup">
                      <Nav.Link>Signup</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="main-and-sidebar">
            {isAuthenticated && <Sidebar />}
            <Navigation />
          </div>
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
