import {
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
  TextField,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CheckIcon from "@mui/icons-material/Check";
import { alpha } from "@mui/material/styles";
import { DataStore, Auth, API } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { Formik } from "formik";

const ListToolbar = ({ numSelected, selected, setSelected, reload }) => {
  const deleteUser = async () => {
    try {
      for (let i = 0; i < selected.length; i++) {
        let credentialsId = selected[i].Attributes.find((a) => a.Name === "custom:UserCreditails").Value;
        if (credentialsId !== null) {
          await DataStore.delete(UserCredentials, credentialsId);
        }

        //delete another user from cognito
        let apiName = "AdminQueries";
        let path = "/deleteUser";
        let myInit = {
          body: {
            username: selected[i].Username,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
          },
        };

        console.log(selected[i].Username);

        await API.del(apiName, path, myInit).catch((error) => {
          console.warn(error);
        });
      }
      setSelected([]);
      reload();
    } catch (error) {
      console.warn(error);
    }
  };

  //automatically set the user to enable
  const enableDisable = async () => {
    const disableUser = async (username) => {
      try {
        for (let i = 0; i < selected.length; i++) {
          let apiName = "AdminQueries";
          let path = "/disableUser";
          let myInit = {
            body: {
              username: username,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
            },
          };

          return await API.post(apiName, path, myInit);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    //enable user
    const enableUser = async (username) => {
      try {
        for (let i = 0; i < selected.length; i++) {
          let apiName = "AdminQueries";
          let path = "/enableUser";
          let myInit = {
            body: {
              username: username,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
            },
          };

          return await API.post(apiName, path, myInit);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    try {
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].Enabled === true) {
          await disableUser(selected[i].Username);
          setSelected([]);
          reload();
        } else {
          await enableUser(selected[i].Username);
          setSelected([]);
          reload();
        }
      }
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
          Workers list
        </Typography>
      )}

      {numSelected > 0 ? (
        <Fragment>
          <Tooltip title="Deactivate/Activate">
            <IconButton onClick={enableDisable}>
              <DoDisturbIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={deleteUser}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ) : (
        <CreateNewUser />
      )}
    </Toolbar>
  );
};

const CreateNewUser = ({ reload }) => {
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={handleOpen}>
        Create new user
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new user to Valpas NextApp</DialogTitle>

        {!created && (
          <DialogContent>
            <DialogContentText>To create a new user, please enter the following information:</DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ListToolbar;
