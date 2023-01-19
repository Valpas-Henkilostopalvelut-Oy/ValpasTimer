import React, { useState } from "react";
import { Box, Container, CssBaseline, Typography, TextField, Grid, Link, useTheme, Collapse } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../services/contextLib";
import LoaderButton from "../../components/LoaderButton";
import { Auth } from "aws-amplify";

const onSubmit = async (values, { setSubmitting }, setMessage, setPassword, userHasAuthenticated, navigate) => {
  const { login, password } = values;
  setSubmitting(true);
  await Auth.signIn(login, password)
    .then((e) => {
      if (e.challengeName !== "NEW_PASSWORD_REQUIRED") {
        userHasAuthenticated(true);
        setTimeout(() => {
          navigate("/home", { replace: true });
          setSubmitting(false);
        }, 1000);
      } else {
        setMessage("Please change your password");
        setPassword(true);
        setSubmitting(false);
      }
    })
    .catch((e) => {
      setMessage(e.message);
    });
};

export const ApplicantLogin = () => {
  const { userHasAuthenticated, langValue } = useAppContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [needNewPassword, setNeedNewPassword] = useState(false);
  const [login, setLogin] = useState("");

  const validationSchema = Yup.object().shape({
    login: Yup.string().max(8, "Must be 8 characters or less").required("Login is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSub = (values, { setSubmitting }) =>
    onSubmit(values, { setSubmitting }, setMessage, setNeedNewPassword, userHasAuthenticated, navigate);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Formik
        // validationSchema={validationSchema}
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={handleSub}
      >
        {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched, isValid, dirty }) => (
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
            <Box
              component="form"
              noValidate
              sx={{
                width: "100%",
                mt: 1,
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="login"
                onChange={(e) => {
                  handleChange(e);
                  setLogin(e.target.value);
                }}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.login}
                error={touched.login && Boolean(errors.login)}
                helperText={touched.login && errors.login}
              />
              <TextField
                variant="outlined"
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
                sx={{ mt: 3, mb: 2 }}
                loading={isSubmitting}
                disabled={!isValid || !dirty}
                loadingText="Loading..."
                text="Sign In"
              />
            </Box>
          </Box>
        )}
      </Formik>
    </Container>
  );
};
