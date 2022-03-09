import React, { useEffect, useState } from "react";
import "./App.css";

//Custom
import { Navbar } from "react-bootstrap";
import Navigation from "./Navigation";
import { Nav } from "react-bootstrap";
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

  Hub.listen("auth", async (data) => {
    switch (data.payload.event) {
      case "signOut":
        await DataStore.clear();
        break;
      case "signIn":
        await DataStore.start();
        break;
    }
  });

  useEffect(() => {
    onLoad();
  }, []);

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

  return (
    !isAuthenticating && (
      <div className="main">
        {isAuthenticated && <Sidebar />}
        <div className="App">
          <AppContext.Provider
            value={{
              isAuthenticated,
              userHasAuthenticated,
            }}
          >
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
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
                      <LinkContainer to="/signup">
                        <Nav.Link>Signup</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Navigation />
          </AppContext.Provider>
        </div>
      </div>
    )
  );
}

export default App;
