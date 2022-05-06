import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const SidebarData = [
  {
    title: "Home",
    type: "page",
    icon: <HomeIcon />,
    link: "/home",
    default: true,
    access: ["Clients", "Admins", "Workers"],
    editing: ["Admins"],
  },
  {
    title: "Time tracker",
    type: "page",
    icon: <AccessTimeIcon />,
    link: "/timer",
    default: false,
    access: ["Clients", "Admins", "Workers"],
    editing: ["Admins"],
  },
  {
    title: "Tasks",
    type: "page",
    icon: <AssignmentIcon />,
    link: "/team",
    default: false,
    access: ["Clients", "Admins"],
    editing: ["Admins"],
  },
  {
    title: "Analyze",
    type: "text",
    access: ["Clients", "Admins"],
  },
  {
    title: "Reports",
    type: "page",
    icon: <DashboardIcon />,
    link: "/reports",
    default: false,
    access: ["Clients", "Admins"],
    editing: ["Clients", "Admins"],
  },
  {
    title: "Team",
    type: "page",
    icon: <PeopleIcon />,
    link: "/team",
    default: false,
    access: ["Clients", "Admins"],
    editing: ["Admins"],
  },
  {
    title: "Admins",
    type: "text",
    access: ["Admins"],
  },
  {
    title: "Workers",
    type: "page",
    icon: <FormatListBulletedIcon />,
    link: "/allworkers",
    default: false,
    access: ["Admins"],
    editing: ["Admins"],
  },
  {
    title: "Workspaces",
    type: "page",
    icon: <WorkIcon />,
    link: "/workspaces",
    default: false,
    access: ["Admins"],
    editing: ["Admins"],
  },
];
