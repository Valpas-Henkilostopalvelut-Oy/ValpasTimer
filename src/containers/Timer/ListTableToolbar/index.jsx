import React from "react";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";

const TableToolBar = (props) => {
  const { numSelected, selected, loadUpdate, clearSelected } = props;

  const deleteSelected = async () => {
    try {
      for (let i = 0; i < selected.length; i++) {
        const timeToDelete = await DataStore.query(TimeEntry, selected[i]);
        await DataStore.delete(timeToDelete);
      }
      loadUpdate();
      clearSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendToConfirm = async () => {
    try {
      for (let i = 0; i < selected.length; i++) {
        const timeToSend = await DataStore.query(TimeEntry, selected[i]);

        await DataStore.save(
          TimeEntry.copyOf(timeToSend, (updated) => {
            updated.isSent = true;
          })
        );
      }
      clearSelected([]);
      loadUpdate()
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
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
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Time List
        </Typography>
      )}

      {numSelected > 0 && (
        <>
          <Tooltip>
            <IconButton onClick={sendToConfirm}>
              <UploadIcon />
            </IconButton>
          </Tooltip>

          <Tooltip>
            <IconButton onClick={deleteSelected}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

export default TableToolBar;
