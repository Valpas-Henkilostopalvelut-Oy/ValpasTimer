import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WorkIcon from "@mui/icons-material/Work";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/home",
    default: true,
    access: ["Clients", "Admins", "Workers"],
    editing: ["Admins"],
  },
  {
    title: "Time tracker",
    icon: <AccessTimeIcon />,
    link: "/timer",
    default: false,
    access: ["Clients", "Admins", "Workers"],
    editing: ["Admins"],
  },
  {
    title: "Reports",
    icon: <DashboardIcon />,
    link: "/reports",
    default: false,
    access: ["Clients", "Admins"],
    editing: ["Clients", "Admins"],
  },
  {
    title: "Team",
    icon: <PeopleIcon />,
    link: "/team",
    default: false,
    access: ["Clients", "Admins"],
    editing: ["Admins"],
  },
  {
    title: "Workers",
    icon: <FormatListBulletedIcon />,
    link: "/allworkers",
    default: false,
    access: ["Admins"],
    editing: ["Admins"],
  },
  {
    title: "Workspaces",
    icon: <WorkIcon />,
    link: "/workspaces",
    default: false,
    access: ["Admins"],
    editing: ["Admins"],
  },
];
