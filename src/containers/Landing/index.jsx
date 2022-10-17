import React from "react";
import { Button, Container, Grid, CssBaseline } from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";

export const LandingPage = () => {
  //Landing page with a button to login or signup in center of screen in column
  return (
    <Container maxWidth="sm" component="main" sx={{ height: "80vh", alignItems: "center", display: "flex" }}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <CssBaseline />
        <Grid
          item
          sx={{
            width: 183,
            height: 48,
            marginRight: 2,
            backgroundImage: "url(https://i.imgur.com/9y9VvOm.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12}>
          <LinkContainer to="/signup">
            <Button
              sx={{
                backgroundColor: "#00ADEF",
                width: 276,
                height: 51,
                fontSize: 16,
                marginTop: "60px",
                ":hover": {
                  backgroundColor: "#666666",
                  color: "#ffffff",
                },
              }}
              variant="contained"
            >
              Register
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
                marginTop: "20px",
                ":hover": {
                  backgroundColor: "#666666",
                  color: "#ffffff",
                },
              }}
              variant="contained"
            >
              Login
            </Button>
          </LinkContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
