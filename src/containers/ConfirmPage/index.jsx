import React from "react";
import { Formik } from "formik";
import { Box, Container, CssBaseline, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton/index.jsx";
import { useAppContext } from "../../services/contextLib.jsx";

const loginAfterConfirm = async ({ val, setWarnmessage }) => {
  await Auth.confirmSignUp(val.email, val.code)
    .then(async () => {
      await Auth.signIn(val.email, val.password).then(() => {});
    })
    .catch((e) => {
      console.warn(e);
      setWarnmessage(e.message);
    });
};

export const ConfirmPage = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    code: yup.string().min(6, "Cant be so short").max(6, "Cant be so long").required("Code is required"),
    password: yup.string().required("Password is required"),
  });

  const [warnMessage, setWarnmessage] = React.useState(null);
  const navigate = useNavigate();
  const { userHasAuthenticated } = useAppContext();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: "",
        code: "",
        password: "",
      }}
      onSubmit={async (val, { setSubmitting }) => {
        setSubmitting(true);
        loginAfterConfirm({ val, warnMessage, setWarnmessage }).then(() => {
          userHasAuthenticated(true);
          setTimeout(() => {
            navigate("/home", { replace: true });
            setSubmitting(false);
          }, 1000);
        });
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched, isValid, dirty }) => (
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
              Confirm your account
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => {
                  handleChange(event);
                  setWarnmessage(null);
                }}
                onBlur={handleBlur}
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
                name="code"
                label="Code"
                type="code"
                id="code"
                autoComplete="current-code"
                onChange={(event) => {
                  handleChange(event);
                  setWarnmessage(null);
                }}
                onBlur={handleBlur}
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
                onChange={(event) => {
                  handleChange(event);
                  setWarnmessage(null);
                }}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password && touched.password}
              />
              {errors.password && touched.password && (
                <Typography variant="caption" color="error">
                  {errors.password}
                </Typography>
              )}

              {warnMessage && (
                <Typography variant="caption" color="error">
                  {warnMessage}
                </Typography>
              )}
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={!isValid || !dirty}
                text="Confirm"
              />
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};
