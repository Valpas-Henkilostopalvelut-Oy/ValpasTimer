import { IconButton, Toolbar, Typography, Tooltip } from "@mui/material";
import React, { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { alpha } from "@mui/material/styles";
import { DataStore, Auth, API } from "aws-amplify";
import { UserCredentials } from "../../../models/index.js";
import { CreateNewUser } from "./createUser.jsx";
import { PropTypes } from "prop-types";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const enableUser = async (username, selected) => {
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

      return await API.post(apiName, path, myInit).then(async () => {
        const dataid = selected[0].Attributes.find((item) => item.Name === "custom:UserCreditails").Value;
        await DataStore.query(UserCredentials, dataid).then(async (data) => {
          await DataStore.save(
            UserCredentials.copyOf(data, (updated) => {
              updated.status = "ACTIVE";
            })
          );
        });
      });
    }
  } catch (error) {
    console.warn(error);
  }
};

const disableUser = async (username, selected) => {
  try {
    for (let i = 0; i < selected.length; i++) {
      let apiName = "AdminQueries";
      let path = "/disableUser";
      let myInit = {
        body: { username: username },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      return await API.post(apiName, path, myInit).then(async () => {
        const dataid = selected[0].Attributes.find((item) => item.Name === "custom:UserCreditails").Value;
        await DataStore.query(UserCredentials, dataid).then(async (data) => {
          await DataStore.save(UserCredentials.copyOf(data, (updated) => (updated.status = "DISABLED")));
        });
      });
    }
  } catch (error) {
    console.warn(error);
  }
};

const enableDisable = async (selected, setSelected, reload) => {
  try {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].Enabled === true) {
        await disableUser(selected[i].Username, selected);
        setSelected([]);
        reload();
      } else {
        await enableUser(selected[i].Username, selected);
        setSelected([]);
        reload();
      }
    }
  } catch (error) {
    console.warn(error);
  }
};

const deleteUser = async (selected, setSelected, reload) => {
  try {
    for (let i = 0; i < selected.length; i++) {
      try {
        // Create the CognitoIdentityServiceProvider object
        const cognito = new CognitoIdentityServiceProvider();
        // Set the parameters for the AdminDeleteUser method
        const params = {
          // eslint-disable-next-line no-undef
          UserPoolId: process.env.REACT_APP_USER_POOL_ID,
          Username: selected[i].Username,
        };
        // Call the AdminDeleteUser method
        await cognito
          .adminDeleteUser(params)
          .promise()
          .then(async () => {
            const dataid = selected[0].Attributes.find((item) => item.Name === "custom:UserCreditails").Value;
            await DataStore.query(UserCredentials, dataid).then(async (data) => {
              await DataStore.save(
                UserCredentials.copyOf(data, (updated) => {
                  updated.status = "DELETED";
                })
              );
            });
          });
        console.log(`User ${selected[i].Username} deleted.`);
      } catch (error) {
        console.error(`Error deleting user: ${error}`);
      }
    }
    setSelected([]);
    reload();
  } catch (error) {
    console.warn(error);
  }
};

const ListToolbar = ({ numSelected, selected, setSelected, reload }) => {
  const handleDisableEnable = () => enableDisable(selected, setSelected, reload);
  const handleDelete = () => deleteUser(selected, setSelected, reload);

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
            <IconButton onClick={handleDisableEnable}>
              <DoDisturbIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ) : (
        <CreateNewUser reload={reload} />
      )}
    </Toolbar>
  );
};

ListToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
};

export default ListToolbar;
