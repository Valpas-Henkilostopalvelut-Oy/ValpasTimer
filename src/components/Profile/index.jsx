import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Menu, MenuItem, Button, Fade, Box } from "@mui/material";
import { useAppContext } from "../../services/contextLib";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
  const { userHasAuthenticated, setAdmin } = useAppContext();
  const navigate = useNavigate();
  const [loadedUser, setLoadedUser] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();

      setLoadedUser(currentUser);
    };

    if (loadedUser === null) loadUser();
  }, [loadedUser]);

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    handleClose();
    navigate("login");
  };

  return (
    <Box>
      <Button
        variant="contained"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Profile
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem disabled>
          {loadedUser != null
            ? loadedUser.attributes.name +
              " " +
              loadedUser.attributes.family_name
            : "Loading"}
        </MenuItem>
        <MenuItem disabled>
          {loadedUser != null ? loadedUser.attributes.email : "Loading"}
        </MenuItem>
        <LinkContainer to={"settings"}>
          <MenuItem onClick={handleClose}>Profile settings</MenuItem>
        </LinkContainer>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
