import React from "react";
import { SidebarList } from "./SidebarDate.jsx";
import { LinkContainer } from "react-router-bootstrap";
import { ListItemText, Box, List, ListItemButton, ListItemIcon, ListItem, SwipeableDrawer } from "@mui/material";

import { useAppContext } from "../../services/contextLib.jsx";

const Sidebar = ({ open, setOpen, isAuth = false }) => {
  const { langValue } = useAppContext();
  const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    isAuth && (
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={open && isAuth}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
          sx={{
            width: 280,
          }}
        >
          <SidebarList handleDrawerClose={handleDrawerClose} open={open} lang={langValue.sidebar} />
        </Box>
      </SwipeableDrawer>
    )
  );
};

export default Sidebar;
