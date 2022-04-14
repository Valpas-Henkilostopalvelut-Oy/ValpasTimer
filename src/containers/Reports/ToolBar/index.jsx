import { Toolbar, Typography, Tooltip, IconButton } from "@mui/material";
import React from "react";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { alpha } from "@mui/material/styles";

const HeadToolBar = (props) => {
  const { numSelected, selected, setSelected, reload } = props;

  const confirmSelected = async () => {
    for (let i = 0; i < selected.length; i++) {
      for (let ii = 0; ii < selected[i].arr.length; ii++) {
        try {
          const timeToConfirm = await DataStore.query(TimeEntry, selected[i].arr[ii].id);

          if (!timeToConfirm.isConfirmed) {
            await DataStore.save(
              TimeEntry.copyOf(timeToConfirm, (update) => {
                update.isConfirmed = true;
                update.isLocked = true;
              })
            );

            reload();
          }

          setSelected([]);
        } catch (error) {
          console.warn(error);
        }
      }
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
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
