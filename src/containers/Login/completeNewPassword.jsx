import React from "react";
import { Box, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../services/contextLib";
import LoaderButton from "../../components/LoaderButton";
import * as Yup from "yup";

const onSubmit = async (values, { setSubmitting }, user, navigate, userHasAuthenticated) => {
  const { password, confirmPassword } = values;
  await Auth.completeNewPassword(user, password).then((e) => {
    userHasAuthenticated(true);
    setTimeout(() => {
      navigate("/home", { replace: true });
      setSubmitting(false);
    }, 1000);
  });
};

export const CompleteNewPassword = ({ user }) => {
  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const handleSub = (e, { setSubmitting }) => {
    onSubmit(e, { setSubmitting }, user, navigate, userHasAuthenticated);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Complete your new password
        </Typography>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={handleSub}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched, isValid, dirty }) => (
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password && touched.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={errors.confirmPassword && touched.confirmPassword}
              />
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isSubmitting}
                disabled={!dirty || !isValid || isSubmitting || values.password !== values.confirmPassword}
                text="Complete"
                loadingText="Completing…"
              />
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
