import React, { useEffect, useState } from "react";

//Custom
import Navigation from "./Navigation.jsx";
import { AppContext } from "./services/contextLib.jsx";
import { Auth, DataStore } from "aws-amplify";
import { onError } from "./services/errorLib.jsx";
import Sidebar from "./components/Sidebar/index.jsx";
import Navbar from "./components/NavBar/index.jsx";
import { Box, CssBaseline, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { customPalette } from "./services/appSettings.jsx";
import { eng } from "./components/Language/langs/eng.js";
import { fin } from "./components/Language/langs/fin.js";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [appLoading, setAppLoading] = useState(true);
  const [language, setLanguage] = useState("");
  const [langValue, setLangValue] = useState({});

  const [groups, setGroups] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = createTheme(customPalette);

  useEffect(() => {
    let isActive = false;

    const onLoad = async () => {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
        setAppLoading(false);
        await DataStore.start();
      } catch (e) {
        if (e !== "No current user") {
          onError(e);
        }
      }
      setIsAuthenticating(false);
    };

    !isActive && onLoad();

    return () => (isActive = true);
  }, []);

  useEffect(() => {
    let isActive = false;

    const loadGroup = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

        groups !== undefined && setGroups(groups);
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && isAuthenticated && loadGroup();

    return () => (isActive = true);
  }, [isAuthenticated]);

  useEffect(() => {
    let isActive = false;

    const loadLang = async () => {
      const lang = localStorage.getItem("lang");

      if (lang !== null) {
        if (lang === "English") {
          setLangValue(eng.main);
        } else if (lang === "Finnish") {
          setLangValue(fin.main);
        }
      } else {
        setLangValue(eng.main);
      }
    };

    !isActive && loadLang();

    return () => (isActive = true);
  }, [language]);

  return langValue !== {} && !isAuthenticating ? (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userHasAuthenticated,
        setGroups,
        groups,
        appLoading,
        setAppLoading,
        setLanguage,
        language,
        langValue,
      }}
    >
      <ThemeProvider theme={theme}>
        <Box>
          <CssBaseline />
          <Navbar open={openDrawer} setOpenDrawer={setOpenDrawer} isAuth={isAuthenticated} />
          <Sidebar open={openDrawer} setOpen={setOpenDrawer} isAuth={isAuthenticated} />
          <Box
            sx={{
              pt: 3,
            }}
          >
            <Navigation isAuthenticated={isAuthenticated} groups={groups} />
          </Box>
        </Box>
      </ThemeProvider>
    </AppContext.Provider>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default App;
