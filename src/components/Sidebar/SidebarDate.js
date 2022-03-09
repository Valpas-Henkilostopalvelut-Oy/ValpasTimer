import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SummarizeIcon from '@mui/icons-material/Summarize';

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Time tracker",
    icon: <AccessTimeIcon />,
    link: "/timer",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Team",
    icon: <PeopleIcon />,
    link: "/team",
  },
  {
    title: "Report",
    icon: <SummarizeIcon />,
    link: "/report",
  },
];
