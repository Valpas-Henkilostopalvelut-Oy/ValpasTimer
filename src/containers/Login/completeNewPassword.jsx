import React from "react";
import { Box, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { Formik } from "formik";

const CompleteNewPassword = ({ user }) => {
  return (
    <Formik initialValues={{ password: "", confirmPassword: "" }}>
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
                    Complete your new password
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
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
                    {errors.password && touched.password && (
                        <Typography variant="caption" color="error">
                            {errors.password}
                        </Typography>
                    </Box>
                    </Box>
                    </Container>
      )}
    </Formik>
  );
};
