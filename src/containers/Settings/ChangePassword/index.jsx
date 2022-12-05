import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import LoaderButton from "../../../components/LoaderButton/index.jsx";
import { Container, Box, Typography, TextField, CssBaseline, Grid, Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { PropTypes } from "prop-types";

const ChangePassword = ({ setChangePassword }) => {
  const [message, setMessage] = useState(null);
  //change password form
  const validationSchema = yup.object().shape({
    oldPassword: yup.string().min(8, "Password must be at least 8 characters").max(50, "Password must be less than 50 characters").required("Password is required"),
    newPassword: yup.string().min(8, "Password must be at least 8 characters").max(50, "Password must be less than 50 characters").required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  //enable button
  const enable = (values) => {
    return !(values.oldPassword && values.newPassword && values.confirmPassword && values.newPassword === values.confirmPassword);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={async (val, { setSubmitting }) => {
        await Auth.currentAuthenticatedUser()
          .then((user) => {
            return Auth.changePassword(user, val.oldPassword, val.newPassword);
          })
          .then(() => {
            setSubmitting(false);
            setMessage(null);
            setChangePassword(false);
          })
          .catch((err) => {
            setMessage(err.message);
            setSubmitting(false);
          });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 3,
                width: "100%",
                maxWidth: "sm",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    id="oldPassword"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => setMessage(null)}
                    value={values.oldPassword}
                    error={errors.oldPassword && touched.oldPassword}
                  />
                  {errors.oldPassword && touched.oldPassword && (
                    <Typography variant="caption" color="error">
                      {errors.oldPassword}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => setMessage(null)}
                    value={values.newPassword}
                    error={errors.newPassword && touched.newPassword}
                  />
                  {errors.newPassword && touched.newPassword && (
                    <Typography variant="caption" color="error">
                      {errors.newPassword}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => setMessage(null)}
                    value={values.confirmPassword}
                    error={errors.confirmPassword && touched.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Typography variant="caption" color="error">
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </Grid>
                {message !== null && (
                  <Grid item xs={12}>
                    <Typography variant="caption" color="error">
                      {message}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <LoaderButton type="submit" fullWidth disabled={enable(values)} isLoading={isSubmitting} text="Change Password" loadingText="Changing Password..." />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button color="secondary" type="button" fullWidth disabled={isSubmitting} onClick={() => setChangePassword(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

ChangePassword.propTypes = {
  setChangePassword: PropTypes.func.isRequired,
};

export default ChangePassword;
