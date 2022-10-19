import React, { Fragment, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../../models";
import { alpha } from "@mui/material/styles";
import { Toolbar, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { AddUser } from "../AddUser";

export const TableToolBar = ({ selected, data, numSelected, setSelected, reload }) => {
  const [open, setOpen] = useState(false);

  //delete selected users from workspace
  const handleDelete = async () => {
    for (let i = 0; i < selected.length; i++) {
      const original = await DataStore.query(AllWorkSpaces, data.id);
      const users = await DataStore.query(UserCredentials);
      const user = users.find((u) => u.userId === selected[i]);

      if (original !== undefined && user !== undefined) {
        try {
          await DataStore.save(
            AllWorkSpaces.copyOf(original, (updated) => {
              updated.memberships = updated.memberships.filter((m) => m.userId !== user.userId);
            })
          );
        } catch (error) {
          console.warn(error);
        }
        try {
          await DataStore.save(
            UserCredentials.copyOf(user, (updated) => {
              updated.memberships = updated.memberships.filter((m) => m.targetId !== original.id);
            })
          );
        } catch (error) {
          console.warn(error);
        }
      }
    }
    reload();
    setSelected([]);
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
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          User list
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment>
          <Tooltip title="Add user">
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <AddUser open={open} setOpen={setOpen} data={data} id={data.id} reload={reload} />
        </Fragment>
      )}
    </Toolbar>
  );
};
