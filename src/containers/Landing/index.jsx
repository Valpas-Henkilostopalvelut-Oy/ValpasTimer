import React from "react";
import { Button, Container, Grid, CssBaseline, Box } from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../../services/contextLib.jsx";
import { Language } from "../../components/Language/language.jsx";

export const LandingPage = () => {
  //Landing page with a button to login or signup in center of screen in column
  const { language, setLanguage, langValue } = useAppContext();
  return (
    <Container maxWidth="sm" component="main" sx={{ height: "80vh", alignItems: "center", display: "flex" }}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <CssBaseline />
        <Grid item xs={12}>
          <Box
            sx={{
              width: 183,
              height: 48,
              backgroundImage: "url(https://i.imgur.com/9y9VvOm.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LinkContainer to="/signup">
            <Button
              sx={{
                backgroundColor: "#00ADEF",
                width: 276,
                height: 51,
                fontSize: 16,
                marginTop: "20px",
                ":hover": {
                  backgroundColor: "#666666",
                  color: "#ffffff",
                },
              }}
              variant="contained"
            >
              {langValue.landingpage.register}
            </Button>
          </LinkContainer>
        </Grid>

        <Grid item xs={12}>
          <LinkContainer to="/login">
            <Button
              sx={{
                backgroundColor: "#50A7C2",
                width: 276,
                height: 51,
                fontSize: 16,
                ":hover": {
                  backgroundColor: "#666666",
                  color: "#ffffff",
                },
              }}
              variant="contained"
            >
              {langValue.landingpage.login}
            </Button>
          </LinkContainer>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              width: 276,
            }}
          >
            <Language setLang={setLanguage} lang={language} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
