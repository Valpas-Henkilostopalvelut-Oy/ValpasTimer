import React, { Fragment } from "react";
import { Container, Box, Typography, CssBaseline, TextField, Link } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import LoaderButton from "../../components/LoaderButton/index.jsx";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../services/contextLib.jsx";

const NewPasswordForm = ({ email, haveCode }) => {
  const [message, setMessage] = React.useState(null);
  const { langValue } = useAppContext();
  const validate = yup.object().shape({
    email: yup
      .string()
      .email(langValue.forgot_password.errors.invalid_email)
      .required(langValue.forgot_password.errors.email_is_required),
    code: yup
      .string()
      .max(6, langValue.forgot_password.errors.code_is_too_long)
      .required(langValue.forgot_password.errors.code_is_required),
    password: yup
      .string()
      .min(8, langValue.forgot_password.errors.password_is_too_short)
      .max(50, langValue.forgot_password.errors.password_is_too_long)
      .required(langValue.forgot_password.errors.password_is_required),
    confirmPassword: yup
      .string()
      .required(langValue.forgot_password.errors.confirmation_code_is_required)
      .oneOf([yup.ref("password"), null], langValue.forgot_password.errors.confirmation_code_does_not_match),
  });
  //navigate
  const navigate = useNavigate();

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
      {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, isValid, dirty }) => (
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
              {langValue.forgot_password.form_title}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={langValue.forgot_password.email}
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClick={() => setMessage(null)}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label={langValue.forgot_password.code}
                name="code"
                autoComplete="code"
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.code}
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={langValue.forgot_password.password}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label={langValue.forgot_password.password_confirmation}
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.confirmPassword}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              {message && <Typography variant="caption">{message}</Typography>}
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                isLoading={isSubmitting}
                text={langValue.forgot_password.change_password}
                loadingText={langValue.forgot_password.changing_password}
                disabled={!isValid || !dirty || isSubmitting}
              />
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

const ForgotPassword = () => {
  const { langValue } = useAppContext();
  const [message, setMessage] = React.useState(null);
  const validate = yup.object().shape({
    email: yup
      .string()
      .email(langValue.forgot_password.errors.invalid_email)
      .required(langValue.forgot_password.email_is_required),
  });

  const [email, setEmail] = React.useState("");
  const [confirmation, setConfirmation] = React.useState(false);
  const [haveCode, setHaveCode] = React.useState(false);

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
      {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, dirty, isValid }) => (
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
              {langValue.forgot_password.title}
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
                label={langValue.forgot_password.email}
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              {message && <Typography variant="caption">{message}</Typography>}
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                isLoading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                sx={{ mt: 2, mb: 2 }}
                text={langValue.forgot_password.send}
                loadingText={langValue.forgot_password.sending}
              />
              <Link
                variant="body2"
                onClick={() => {
                  setMessage(null);
                  setHaveCode(true);
                  setConfirmation(true);
                }}
              >
                {langValue.forgot_password.have_code}
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
