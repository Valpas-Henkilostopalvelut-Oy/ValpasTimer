import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

export const SidebarData = [
  {
    title: "Etusivu",
    type: "page",
    icon: <HomeIcon />,
    link: "/home",
    default: true,
    access: ["Clients", "Admins", "Workers"],
    editing: ["Admins"],
  },
  {
    title: "Seuranta",
    type: "page",
    icon: <AccessTimeIcon />,
    link: "/timer",
    default: false,
    access: ["Clients", "Admins", "Workers"],
    editing: ["Admins"],
  },
  {
    title: "Työvuorot",
    type: "page",
    icon: <AssignmentIcon />,
    link: "/work",
    default: false,
    access: ["Workers", "Clients", "Admins"],
    editing: ["Admins"],
  },
  {
    title: "Perehdykset",
    type: "page",
    icon: <AssignmentLateIcon />,
    link: "/onboarding",
    default: false,
    access: ["Workers", "Clients", "Admins"],
    editing: ["Admins"],
  },
  {
    title: "Analyze",
    type: "text",
    access: ["Clients", "Admins"],
  },
  {
    title: "Raportit",
    type: "page",
    icon: <DashboardIcon />,
    link: "/reports",
    default: false,
    access: ["Clients", "Admins"],
    editing: ["Clients", "Admins"],
  },
  {
    title: "Ihmiset",
    type: "page",
    icon: <PeopleIcon />,
    link: "/team",
    default: false,
    access: ["Clients", "Admins"],
    editing: ["Admins"],
  },
  {
    title: "Admin panel",
    type: "text",
    access: ["Admins"],
  },
  {
    title: "Suunnittelu",
    type: "page",
    icon: <WorkHistoryIcon />,
    link: "/works",
    default: false,
    access: ["Admins"],
    editing: ["Admins"],
  },
  {
    title: "Työntekijät",
    type: "page",
    icon: <FormatListBulletedIcon />,
    link: "/allworkers",
    default: false,
    access: ["Admins"],
    editing: ["Admins"],
  },
  {
    title: "Työpaikat",
    type: "page",
    icon: <WorkIcon />,
    link: "/workspaces",
    default: false,
    access: ["Admins"],
    editing: ["Admins"],
  },
];
