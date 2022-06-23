import React, { useState } from "react";
import { Button, Box, Container, Typography, Grid } from "@mui/material";
import { Height } from "@mui/icons-material";

export const LandingPage = () => {
  //Landing page with a button to login or signup in center of screen in column
  return (
    <Container maxWidth="xs">
      <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <Grid
          item
          sx={{
            width: "90px",
            height: "100%",
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12}>
          <Button>Register</Button>
        </Grid>

        <Grid item xs={12}>
          <Button>Login</Button>
        </Grid>
      </Grid>
    </Container>
  );
};
