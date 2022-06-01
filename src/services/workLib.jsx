import React from "react";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import SyncIcon from "@mui/icons-material/Sync";
import DoneIcon from "@mui/icons-material/Done";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

export const WorkStatus = ({ status }) => {
  switch (status) {
    case "INWAITTING":
      return <HourglassTopRoundedIcon />;
    case "COMPLETE":
      return <DoneIcon />;
    case "ACTIVE":
      return <SyncIcon />;
    default:
      return <SyncProblemIcon />;
  }
};
