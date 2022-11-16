import React from "react";
import { Toolbar, Typography, IconButton, SvgIcon, Grid, AppBar, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "../Profile/index.jsx";
import SvgComponent from "../../assets/logo2.jsx";

const Navbar = ({ setOpenDrawer, isAuth = false }) => {
  const theme = useTheme();
  return (
    isAuth && (
      <AppBar position="static" color="navbar">
        <Toolbar>
          <Grid
            container
            spacing={2}
            sx={{
              [theme.breakpoints.up("sm")]: {
                paddingLeft: 2,
                paddingRight: 2,
              },
            }}
          >
            <Grid item xs={1} display="flex" justifyContent="start" alignItems="center">
              <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpenDrawer(true)} edge="start">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={3} display="flex" justifyContent="start" alignItems="center">
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
        </Toolbar>
      </AppBar>
    )
  );
};

export default Navbar;
