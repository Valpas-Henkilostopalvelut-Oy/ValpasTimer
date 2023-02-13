/* eslint-disable no-undef */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
  TextField,
  Box,
  Grid,
  Collapse,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const temporarypassword = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const createUser = async (values, close, reload, setOpen, password) => {
  var data = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    Username: values.email,
    TemporaryPassword: password,
    UserAttributes: [
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
  };

  cognitoIdentityServiceProvider.adminCreateUser(data, function (err, data) {
    if (err) console.warn(err);
    // an error occurred
    else {
      console.log(data); // successful response
      setOpen(true);
      reload();
    }
  });
};

export const CreateNewUser = ({ reload }) => {
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState(false);
  const [password, setPassword] = useState(temporarypassword());
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setOpen(false);
    setPassword(temporarypassword());
    setCreated(false);
  };

  const handleOpen = () => setOpen(true);

  return (
    <Fragment>
      <Button variant="contained" onClick={handleOpen}>
        Create new user
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new user to Valpas NextApp</DialogTitle>(
        <DialogContent>
          <DialogContentText>To create a new user, please enter the following information:</DialogContentText>
          <Formik
            initialValues={{
              email: "",
              first_name: "",
              last_name: "",
            }}
            onSubmit={async (values) => {
              try {
                await createUser(values, handleClose, reload, setCreated, password);
                //setCreated(true);
              } catch (error) {
                console.warn(error);
              }
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: "480px" }}>
                <Grid container spacing={2}>
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
                      onChange={(e) => {
                        handleChange(e);
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Collapse in={created}>
                      <DialogContentText>User created successfully.</DialogContentText>
                      <DialogContentText>
                        User login: {email} and password: {password}
                      </DialogContentText>
                    </Collapse>
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" hidden={created}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary" hidden={created}>
                    Create
                  </Button>
                  <Button onClick={handleClose} color="primary" hidden={!created}>
                    Close
                  </Button>
                </DialogActions>
              </Box>
            )}
          </Formik>
        </DialogContent>
        )
      </Dialog>
    </Fragment>
  );
};
