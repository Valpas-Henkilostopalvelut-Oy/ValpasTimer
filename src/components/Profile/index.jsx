import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import { useAppContext } from "../../services/contextLib.jsx";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Language } from "../Language/language.jsx";

const Profile = () => {
  const { userHasAuthenticated, setGroups, setLanguage, language } = useAppContext();
  const navigate = useNavigate();
  const [loadedUser, setLoadedUser] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    let isActive = false;

    const loadUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();

        !isActive && setLoadedUser(currentUser);
      } catch (e) {
        console.warn(e);
      }
    };

    if (loadedUser === null) loadUser();
    return () => (isActive = true);
  }, [loadedUser]);

  const handleLogout = async () => {
    await DataStore.stop();
    await Auth.signOut();
    setGroups([]);
    userHasAuthenticated(false);
    navigate("/", { replace: true });
    await DataStore.clear();
  };

  const menuId = "primary-search-account-menu";

  return (
    <Box>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <Language setLang={setLanguage} lang={language} />
        </MenuItem>
        <LinkContainer to={"profile"}>
          <MenuItem onClick={handleClose}>
            {loadedUser != null ? loadedUser.attributes.name + " " + loadedUser.attributes.family_name : "Loading"}
          </MenuItem>
        </LinkContainer>
        <MenuItem disabled>{loadedUser != null ? loadedUser.attributes.email : "Loading"}</MenuItem>
        <LinkContainer to={"settings"}>
          <MenuItem onClick={handleClose}>Profile settings</MenuItem>
        </LinkContainer>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
