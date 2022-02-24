import React, { useEffect, useState } from "react";
import "./App.css";

//Custom
import { Navbar, Dropdown } from "react-bootstrap";
import Navigation from "./Navigation";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./services/contextLib";
import { Auth, DataStore, Hub } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "./services/errorLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

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

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  };

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
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/timer">
            <Navbar.Brand className="font-weight-bold text-muted">
              Valpas Timer
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle>Profile</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <LinkContainer to="/settings">
                        <Dropdown.Item>Settings</Dropdown.Item>
                      </LinkContainer>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Navigation />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
