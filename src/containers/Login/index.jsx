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
  const { userHasAuthenticated, langValue } = useAppContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  //validate
  const validationSchema = yup.object().shape({
    email: yup.string().email(langValue.login.errors.invalid_email).required(langValue.login.errors.email_is_required),
    password: yup.string().required(langValue.login.errors.password_is_required),
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
              {langValue.login.title}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={langValue.login.email}
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={langValue.login.password}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {message !== null && (
                <Typography variant="caption" color="error">
                  {message}
                </Typography>
              )}

              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                isLoading={isSubmitting}
                text={langValue.login.login}
                loadingText={langValue.login.logging_in}
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
                    <Link variant="body2">{langValue.login.forgot_password}</Link>
                  </LinkContainer>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{ [theme.breakpoints.up("md")]: { display: "flex", justifyContent: "flex-end" } }}
                >
                  <LinkContainer to="/signup">
                    <Link variant="body2">{langValue.login.register}</Link>
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
