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
    editing: { admin: true, editors: true, applicant: false },
  },
  {
    title: "Time tracker",
    icon: <AccessTimeIcon />,
    link: "/timer",
  },
  {
    title: "Reports",
    icon: <DashboardIcon />,
    link: "/reports",
    access: { admin: true, editors: true, applicant: true },
    editing: { admin: true, editors: true, applicant: true },
  },
  {
    title: "Team",
    icon: <PeopleIcon />,
    link: "/team",
    access: { admin: true, editors: true, applicant: true },
    editing: { admin: true, editors: true, applicant: false },
  },
  {
    title: "Workers",
    icon: <FormatListBulletedIcon />,
    link: "/allworkers",
    access: { admin: true, editors: true, applicant: false },
    editing: { admin: true, editors: true, applicant: false },
  },
  {
    title: "Workspaces",
    icon: <WorkIcon />,
    link: "/workspaces",
    access: { admin: true, editors: true, applicant: false },
    editing: { admin: true, editors: true, applicant: false },
  },
];
