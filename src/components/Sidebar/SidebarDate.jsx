import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import HistoryIcon from "@mui/icons-material/History";
import { useAppContext } from "../../services/contextLib.jsx";
import { LinkContainer } from "react-router-bootstrap";
import { ListItemText, List, ListItemButton, ListItemIcon, ListItem } from "@mui/material";
import { PropTypes } from "prop-types";

export const SidebarList = ({
  handleDrawerClose,
  open,
  lang = {
    home: "Home",
    track: "Time tracker",
    project: "Projects",
    analyze: "Analyze",
    reports: "Reports",
    team: "Team",
    admin_panel: "Admin Panel",
    projects: "Projects Admin",
    workers: "Workers",
    workplaces: "Workplaces",
  },
}) => {
  const { groups } = useAppContext();

  const sidebarData = [
    {
      title: lang.home,
      type: "page",
      icon: <HomeIcon />,
      link: "/home",
      default: true,
      access: ["Clients", "Admins", "Workers"],
    },
    {
      title: lang.track,
      type: "page",
      icon: <AccessTimeIcon />,
      link: "/timer",
      default: false,
      access: ["Clients", "Admins", "Workers"],
    },
    {
      title: "History",
      type: "page",
      icon: <HistoryIcon />,
      link: "/history",
      default: false,
      access: ["Workers", "Clients", "Admins"],
    },
    {
      title: lang.project,
      type: "page",
      icon: <AssignmentIcon />,
      link: "/work",
      default: false,
      access: ["Workers", "Clients", "Admins"],
    },

    {
      title: lang.analyze,
      type: "text",
      access: ["Clients", "Admins"],
    },
    {
      title: lang.reports,
      type: "page",
      icon: <DashboardIcon />,
      link: "/reports",
      default: false,
      access: ["Clients", "Admins"],
    },
    {
      title: lang.team,
      type: "page",
      icon: <PeopleIcon />,
      link: "/team",
      default: false,
      access: ["Clients", "Admins"],
    },

    {
      title: lang.admin_panel,
      type: "text",
      access: ["Admins"],
    },
    {
      title: lang.projects,
      type: "page",
      icon: <WorkHistoryIcon />,
      link: "/works",
      default: false,
      access: ["Admins"],
    },
    {
      title: lang.workers,
      type: "page",
      icon: <FormatListBulletedIcon />,
      link: "/allworkers",
      default: false,
      access: ["Admins"],
    },
    {
      title: lang.workplaces,
      type: "page",
      icon: <WorkIcon />,
      link: "/workspaces",
      default: false,
      access: ["Admins"],
    },
  ];

  return (
    <List>
      {sidebarData.map((component) =>
        component.type === "page"
          ? (component.access.includes(groups[0]) || component.default) && (
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
          : component.type === "text" &&
            (component.access.includes(groups[0]) || component.default) && (
              <ListItem key={component.title}>
                <ListItemText primary={component.title} />
              </ListItem>
            )
      )}
    </List>
  );
};

SidebarList.propTypes = {
  handleDrawerClose: PropTypes.func,
  open: PropTypes.bool,
  lang: PropTypes.object,
};
