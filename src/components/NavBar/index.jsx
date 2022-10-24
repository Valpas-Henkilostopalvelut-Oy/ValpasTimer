import React from "react";
import { Toolbar, Typography, IconButton, Container, SvgIcon, Grid } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "../Profile/index.jsx";
import SvgComponent from "../../assets/logo2.jsx";

const Navbar = ({ position, open, setOpenDrawer, isAuthenticated }) => {
  const drawerWidth = 310;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  //get svg logo from assets

  return (
    <AppBar position="fixed" open={open} color="navbar">
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenDrawer(true)}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

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
