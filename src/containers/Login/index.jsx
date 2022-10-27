import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../../services/contextLib.jsx";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/index.jsx";
import { Formik } from "formik";
import { Box, Container, CssBaseline, Typography, TextField, Grid, Link } from "@mui/material";
import * as yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  //validate
  const validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  //enable button

  const theme = useTheme();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (val, { setSubmitting }) => {
        setSubmitting(true);

        await Auth.signIn(val.email, val.password)
          .then((e) => {
            if (e.challengeName !== "NEW_PASSWORD_REQUIRED") {
              userHasAuthenticated(true);
              setTimeout(() => {
                navigate("/home", { replace: true });
                setSubmitting(false);
              }, 1000);
            } else {
              setMessage("Please change your password");
              setSubmitting(false);
            }
          })
          .catch((e) => setMessage(e.message));
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched, isValid, dirty }) => (
        //login form
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                pl: 3,
                pr: 3,
              },
            }}
          >
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
                disabled={!isValid || !dirty || isSubmitting}
              />
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ [theme.breakpoints.up("md")]: { display: "flex", justifyContent: "flex-start" } }}
                >
                  <LinkContainer to="/forgot-password">
                    <Link variant="body2">Forgot password?</Link>
                  </LinkContainer>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{ [theme.breakpoints.up("md")]: { display: "flex", justifyContent: "flex-end" } }}
                >
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
