import React from "react";
import { SidebarData } from "./SidebarDate.js";
import { LinkContainer } from "react-router-bootstrap";
import {
  ListItemText,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItem,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAppContext } from "../../services/contextLib.jsx";

const Sidebar = ({ open, setOpen }) => {
  const { groups } = useAppContext();
  const theme = useTheme();
  const drawerWidth = 310;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("md")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
