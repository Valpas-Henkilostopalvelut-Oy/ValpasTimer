import React from "react";
import { Toolbar, Typography, IconButton, Container, SvgIcon, Grid, AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "../Profile/index.jsx";
import SvgComponent from "../../assets/logo2.jsx";

const Navbar = ({ open, setOpenDrawer, isAuth = false, language, setLanguage }) => {
  return (
    <AppBar position="static" color="navbar">
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpenDrawer(true)} edge="start">
          <MenuIcon />
        </IconButton>

        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Grid item xs={4} display="flex" justifyContent="start" alignItems="center">
              <SvgIcon>
                <SvgComponent />
              </SvgIcon>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
              <Typography variant="p" color="white">
                Valpas Timer
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="end" alignItems="center">
              <Profile />
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
