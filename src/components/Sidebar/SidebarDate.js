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
    access: {
      admin: true,
      editors: true,
      applicant: true,
      worker: true,
      new: true,
    },
    editing: {
      admin: true,
      editors: true,
      applicant: false,
      worker: false,
      new: false,
    },
  },
  {
    title: "Time tracker",
    icon: <AccessTimeIcon />,
    link: "/timer",
    access: {
      admin: true,
      editors: true,
      applicant: true,
      worker: true,
      new: false,
    },
    editing: {
      admin: true,
      editors: true,
      applicant: false,
      worker: true,
      new: false,
    },
  },
  {
    title: "Reports",
    icon: <DashboardIcon />,
    link: "/reports",
    access: {
      admin: true,
      editors: true,
      applicant: true,
      worker: false,
      new: false,
    },
    editing: {
      admin: true,
      editors: true,
      applicant: true,
      worker: false,
      new: false,
    },
  },
  {
    title: "Team",
    icon: <PeopleIcon />,
    link: "/team",
    access: {
      admin: true,
      editors: true,
      applicant: true,
      worker: false,
      new: false,
    },
    editing: {
      admin: true,
      editors: true,
      applicant: false,
      worker: false,
      new: false,
    },
  },
  {
    title: "Workers",
    icon: <FormatListBulletedIcon />,
    link: "/allworkers",
    access: {
      admin: true,
      editors: true,
      applicant: false,
      worker: false,
      new: false,
    },
    editing: {
      admin: true,
      editors: true,
      applicant: false,
      worker: false,
      new: false,
    },
  },
  {
    title: "Workspaces",
    icon: <WorkIcon />,
    link: "/workspaces",
    access: {
      admin: true,
      editors: true,
      applicant: false,
      worker: false,
      new: false,
    },
    editing: {
      admin: true,
      editors: true,
      applicant: false,
      worker: false,
      new: false,
    },
  },
];
