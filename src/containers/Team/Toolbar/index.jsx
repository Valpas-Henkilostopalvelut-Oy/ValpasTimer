import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../../models";
import PopupAddUser from "../Modal";
import AddIcon from "@mui/icons-material/Add";

const TeamToolbar = ({
  numSelected,
  reload,
  selected,
  groups,
  option,
  setSelected,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    reload();
  };
  const handleOpen = () => setOpen(true);

  const removeUser = async () => {
    for (let i = 0; i < selected.length; i++) {
      const userToRemove = await DataStore.query(UserCredentials, selected[i]);
      const workspace = await DataStore.query(AllWorkSpaces, option.id);

      for (let ii = 0; ii < userToRemove.memberships.length; ii++) {
        if (userToRemove.memberships[ii].targetId === option.id) {
          try {
            await DataStore.save(
              UserCredentials.copyOf(userToRemove, (update) => {
                update.memberships.splice(ii, 1);
              })
            );
            reload();
          } catch (error) {
            console.warn(error);
          }
        }
      }

      for (let ii = 0; ii < workspace.memberships.length; ii++) {
        if (workspace.memberships[ii].userId === selected[i]) {
          try {
            await DataStore.save(
              AllWorkSpaces.copyOf(workspace, (update) => {
                update.memberships.splice(ii, 1);
              })
            );
          } catch (error) {
            console.warn(error);
          }
        }
      }
    }
    setSelected([]);
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
          Teams
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={removeUser}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        groups.includes("Admins") &&
        option !== null && (
          <Box>
            <Tooltip title="Add worker">
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </Tooltip>

            <PopupAddUser
              workspaceId={option.id}
              groups={groups}
              modalState={open}
              closeModal={handleClose}
              reload={reload}
            />
          </Box>
        )
      )}
    </Toolbar>
  );
};

export default TeamToolbar;
