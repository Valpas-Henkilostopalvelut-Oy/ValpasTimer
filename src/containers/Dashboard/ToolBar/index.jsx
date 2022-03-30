import { Toolbar, Typography, Tooltip, IconButton } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";

const HeadToolBar = (props) => {
  const { numSelected, selected } = props;

  const confirmSelected = async () => {
    for (let i = 0; i < selected.length; i++) {
      const timeToConfirm = await DataStore.query(TimeEntry, selected[i]);

      await DataStore.save(
        TimeEntry.copyOf(timeToConfirm, (update) => {
          update.isConfirmed = true;
          update.isLocked = true;
        })
      );
    }
  };

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
          Time List
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Confirm">
          <IconButton onClick={confirmSelected}>
            <ThumbUpOffAltRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default HeadToolBar;
