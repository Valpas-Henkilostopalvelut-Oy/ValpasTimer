import { IconButton, Toolbar, Typography, Tooltip } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { alpha } from "@mui/material/styles";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";

const ListToolbar = ({ numSelected, selected, setSelected }) => {
  const deleteUser = async () => {
    try {
      for (let i = 0; i < selected.length; i++) {
        const userToDelete = await DataStore.query(
          UserCredentials,
          selected[i]
        );
        DataStore.delete(userToDelete);
      }
      setSelected([]);
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
          Workers list
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={deleteUser}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default ListToolbar;
