import { IconButton, Toolbar, Typography, Tooltip } from "@mui/material";
import React, { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CheckIcon from "@mui/icons-material/Check";
import { alpha } from "@mui/material/styles";
import { DataStore, Auth, API } from "aws-amplify";
import { UserCredentials } from "../../../models";

const ListToolbar = ({ numSelected, selected, setSelected, reload }) => {
  const deleteUser = async () => {
    try {
      for (let i = 0; i < selected.length; i++) {
        let credentialsId = selected[i].Attributes.find((a) => a.Name === "custom:UserCreditails").Value;
        if (credentialsId !== null) {
          await DataStore.delete(UserCredentials, credentialsId);
        }
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
      console.log(selected);
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

      {numSelected > 0 && (
        <Fragment>
          <Tooltip title="Delete">
            <IconButton onClick={enableDisable}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      )}
    </Toolbar>
  );
};

export default ListToolbar;
