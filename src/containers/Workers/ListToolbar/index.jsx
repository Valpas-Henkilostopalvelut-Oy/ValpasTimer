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
  Container,
  CssBaseline,
  Box,
  Grid,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CheckIcon from "@mui/icons-material/Check";
import { alpha } from "@mui/material/styles";
import { DataStore, Auth, API } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { Formik } from "formik";

const createUser = async (values) => {
  let apiName = "AdminQueries";
  let path = "/adminCreateUser";
  let myInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
    },
    userpoolid: "eu-west-1_tYXLeogj0",
    body: {
      username: values.email,
      userattributes: [
        {
          Name: "locale",
          Value: "Finland",
        },
        {
          Name: "custom:UserCreditails",
          Value: "null",
        },
        {
          Name: "custom:RuningTimeEntry",
          Value: "null",
        },
        {
          Name: "name",
          Value: values.first_name,
        },
        {
          Name: "family_name",
          Value: values.last_name,
        },
        {
          Name: "email",
          Value: values.email,
        },
        {
          Name: "picture",
          Value: "https://source.unsplash.com/random/256x256",
        },
      ],
    },
  };
  return await API.post(apiName, path, myInit);
};

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
            <Formik
              initialValues={{
                email: "",
                first_name: "",
                last_name: "",
                phone_number: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  console.log(await createUser(values));
                  //setCreated(true);
                } catch (error) {
                  console.warn(error);
                }
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: "480px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="first_name"
                        variant="outlined"
                        required
                        fullWidth
                        id="first_name"
                        label="First Name"
                        autoFocus
                        value={values.first_name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="lname"
                        value={values.last_name}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                      Create
                    </Button>
                  </DialogActions>
                </Box>
              )}
            </Formik>
          </DialogContent>
        )}
      </Dialog>
    </Fragment>
  );
};

export default ListToolbar;
