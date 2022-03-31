import React, { useEffect, useState } from "react";
import "./App.css";

//Custom
import Navigation from "./Navigation";
import { AppContext } from "./services/contextLib";
import { Auth, DataStore, Hub } from "aws-amplify";
import { onError } from "./services/errorLib";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const [admin, setAdmin] = useState(false);
  const [editor, setEditor] = useState(false);
  const [applicant, setAplicant] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  Hub.listen("auth", async (data) => {
    switch (data.payload.event) {
      case "signOut":
        await DataStore.clear();
        setAdmin(false);
        setEditor(false);
        setAplicant(false);
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

  const Header = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  return (
    !isAuthenticating && (
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
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Navbar
            open={openDrawer}
            setOpenDrawer={setOpenDrawer}
            isAuthenticated={isAuthenticated}
          />
          {isAuthenticated && (
            <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
          )}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Header />
            <Navigation />
          </Box>
        </Box>
      </AppContext.Provider>
    )
  );
}

export default App;
