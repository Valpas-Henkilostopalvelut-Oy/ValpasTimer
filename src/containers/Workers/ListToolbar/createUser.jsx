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
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import AWS from "aws-sdk";

const config = {
  region: "eu-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const createUser = async (values) => {
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(config);
  var data = {
    UserPoolId: "eu-west-1_tYXLeogj0",
    Username: values.email,
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

  cognitoidentityserviceprovider.adminCreateUser(data, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
};

export const CreateNewUser = () => {
  const [open, setOpen] = useState(false);

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
        <DialogTitle>Add new user to Valpas NextApp</DialogTitle>(
        <DialogContent>
          <DialogContentText>To create a new user, please enter the following information:</DialogContentText>
          <Formik
            initialValues={{
              email: "",
              first_name: "",
              last_name: "",
              phone_number: "",
            }}
            onSubmit={async (values) => {
              try {
                await createUser(values);
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
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="phone_number"
                      label="Phone Number"
                      name="phone_number"
                      autoComplete="phone_number"
                      value={values.phone_number}
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
        )
      </Dialog>
    </Fragment>
  );
};
