import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { useAppContext } from "../../services/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import { ListItemText, List, ListItemButton, ListItemIcon, ListItem } from "@mui/material";

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
  console.log(lang);

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
      {sidebarData.map((component, index) =>
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
          : component.type === "text" && (
              <ListItem key={component.title}>
                <ListItemText primary={component.title} />
              </ListItem>
            )
      )}
    </List>
  );
};
