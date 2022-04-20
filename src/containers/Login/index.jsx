import React, { useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { useAppContext } from "../../services/contextLib";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { createUser } from "../../services/createUser";
import { UserCredentials } from "../../models";
import { Formik } from "formik";
import { Box, Container, CssBaseline, Typography, TextField, Grid, Link } from "@mui/material";
import * as yup from "yup";
import { LinkContainer } from "react-router-bootstrap";

const Login = () => {
  const { userHasAuthenticated, setAppLoading } = useAppContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const checkUserProfile = async () => {
    try {
      const currentuser = await DataStore.query(UserCredentials);
      if (currentuser.length === 0) {
        createUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //validate
  const validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  //enable button
  const enable = (values) => {
    return !(values.email.length === 0 || values.password.length === 0);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (val, { setSubmitting }) => {
        setSubmitting(true);

        try {
          await Auth.signIn(val.email, val.password);
          await DataStore.start();
          userHasAuthenticated(true);
          setTimeout(() => {
            checkUserProfile();
          }, 1000);
          setAppLoading(false);
          navigate("/home", { replace: true });
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
          setMessage(e.message);
        }
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched }) => (
        //login form
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.email}
                error={errors.email && touched.email}
              />
              {errors.email && touched.email && (
                <Typography variant="caption" color="error">
                  {errors.email}
                </Typography>
              )}
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
                onClick={() => setMessage(null)}
                value={values.password}
                error={errors.password && touched.password}
              />
              {message !== null && (
                <Typography variant="caption" color="error">
                  {message}
                </Typography>
              )}
              {errors.password && touched.password && (
                <Typography variant="caption" color="error">
                  {errors.password}
                </Typography>
              )}
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                isLoading={isSubmitting}
                text="Sign In"
                loadingText="Logging in…"
                disabled={!enable(values)}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>

                <Grid item>
                  <LinkContainer to="/signup">
                    <Link variant="body2">Don't have an account? Sign Up</Link>
                  </LinkContainer>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default Login;
