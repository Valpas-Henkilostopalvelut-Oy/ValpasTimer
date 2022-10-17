import React, { Fragment } from "react";
import { Container, Box, Typography, CssBaseline, TextField, Link } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import LoaderButton from "../../components/LoaderButton/index.jsx";
import { useNavigate } from "react-router-dom";

const NewPasswordForm = ({ email, haveCode }) => {
  const [message, setMessage] = React.useState(null);
  const validate = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    code: yup.string().max(6, "Code is too long").required("Code is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  //navigate
  const navigate = useNavigate();

  //enable button if values is valid
  const enable = (values) => {
    return (
      !(values.email.length === 0) &&
      !(values.code.length === 0) &&
      !(values.password.length === 0) &&
      !(values.confirmPassword.length === 0) &&
      values.password === values.confirmPassword
    );
  };

  return (
    <Formik
      initialValues={{ email: email, code: "", password: "", confirmPassword: "" }}
      validationSchema={validate}
      onSubmit={(values, { setSubmitting }) => {
        if (values.password === values.confirmPassword) {
          Auth.forgotPasswordSubmit(values.email, values.code, values.password)
            .then(() => {
              setMessage("Password has been reset");
              setTimeout(() => {
                //navigate to login
                navigate("/login");
                setSubmitting(false);
              }, 1000);
            })
            .catch((err) => {
              setMessage(err.message);
              setSubmitting(false);
            });
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
        <Container maxWidth="xs" component="main">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Typography variant="h5" component="h1">
              New Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
              }}
              noValidate
            >
              {haveCode && (
                <Fragment>
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
                    <Typography variant="body2" color="error">
                      {errors.email}
                    </Typography>
                  )}
                </Fragment>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Code"
                name="code"
                autoComplete="code"
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.code}
                error={errors.code && touched.code}
              />
              {errors.code && touched.code && (
                <Typography variant="caption" color="error">
                  {errors.code}
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
              {errors.password && touched.password && (
                <Typography variant="caption" color="error">
                  {errors.password}
                </Typography>
              )}
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
                onClick={() => setMessage(null)}
                value={values.confirmPassword}
                error={errors.confirmPassword && touched.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Typography variant="caption" color="error">
                  {errors.confirmPassword}
                </Typography>
              )}
              {message && <Typography variant="caption">{message}</Typography>}
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                isLoading={isSubmitting}
                text="Change Password"
                loadingText="Changing password…"
                disabled={!enable(values)}
              />
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

const ForgotPassword = () => {
  const [message, setMessage] = React.useState(null);
  const validate = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
  });

  const [email, setEmail] = React.useState("");
  const [confirmation, setConfirmation] = React.useState(false);
  const [haveCode, setHaveCode] = React.useState(false);

  //enable button if email is valid
  const enable = (values) => {
    return !(values.email.length === 0);
  };

  return !confirmation ? (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values, { setSubmitting }) => {
        

        Auth.forgotPassword(values.email)
          .then(() => {
            setMessage("An email has been sent to confirm your request.");
            setEmail(values.email);
            setConfirmation(true);
          })
          .catch((err) => {
            setMessage(err.message);
            setSubmitting(false);
          });
      }}
      validationSchema={validate}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
        <Container maxWidth="xs" component="main">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Typography variant="h5" component="h1">
              Forgot Password
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
              }}
              noValidate
            >
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
              {message && <Typography variant="caption">{message}</Typography>}
              {errors.email && touched.email && (
                <Typography variant="caption" color="error">
                  {errors.email}
                </Typography>
              )}
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                isLoading={isSubmitting}
                disabled={!enable(values)}
                sx={{ mt: 2, mb: 2 }}
                text="Send Reset Code"
                loadingText="Sending…"
              />
              <Link
                variant="body2"
                onClick={() => {
                  setMessage(null);
                  setHaveCode(true);
                  setConfirmation(true);
                }}
              >
                I already have code
              </Link>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  ) : (
    <NewPasswordForm email={email} haveCode={haveCode} />
  );
};

export default ForgotPassword;
