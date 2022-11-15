import React from "react";
import { SidebarData } from "./SidebarDate.js";
import { LinkContainer } from "react-router-bootstrap";
import {
  ListItemText,
  Divider,
  IconButton,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItem,
  SwipeableDrawer,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAppContext } from "../../services/contextLib.jsx";
import { Language } from "../Language/language.jsx";

const Sidebar = ({ open, setOpen }) => {
  const { groups, setLanguage, language } = useAppContext();
  const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={open}
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
        <List>
          {SidebarData.map((component, index) => {
            if (component.type === "page") {
              return (
                (component.access.includes(groups[0]) || component.default) && (
                  <LinkContainer to={component.link} key={component.title}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={handleDrawerClose}
                    >
                      <ListItemIcon
                        sx={{
                          minHeight: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {component.icon}
                      </ListItemIcon>
                      <ListItemText primary={component.title} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </LinkContainer>
                )
              );
            } else if (component.type === "text") {
              return (
                open &&
                component.access.includes(groups[0]) && (
                  <ListItem key={component.title}>
                    <ListItemText primary={component.title} />
                  </ListItem>
                )
              );
            }
          })}
          <ListItem>
            <Language setLang={setLanguage} lang={language} />
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default Sidebar;
