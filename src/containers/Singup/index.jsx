import React, { useState } from "react";
import { useAppContext } from "../../services/contextLib.jsx";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import { Formik } from "formik";
import { useTheme } from "@mui/material/styles";
import LoaderButton from "../../components/LoaderButton/index.jsx";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { de } from "date-fns/locale";
import { country } from "./country.jsx";

const phone = (phone) => {
  if (phone.length === 13) {
    return `${phone}`;
  } else if (phone.length === 10) {
    return `+358${phone.slice(1)}`;
  } else if (phone.length === 9) return `+358${phone}`;
};

const ConfirmForm = ({ password, email }) => {
  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [warnText, setWarnText] = useState("");

  const enableButton = (values) => {
    return values.confirmationCode.length > 0 && values.confirmationCode.length === 6;
  };
  //validate form
  const validationSchema = yup.object().shape({
    confirmationCode: yup.string().required("Confirmation code is required"),
  });

  //Confirming form
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        confirmationCode: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await Auth.confirmSignUp(email, values.confirmationCode);
          await Auth.signIn(email, password);
          userHasAuthenticated(true);
          navigate("/home", { replace: true });
        } catch (e) {
          setWarnText(e.message);
          console.warn(e);
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors }) => (
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
              Confirm Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: "300px" }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="confirmationCode"
                label="Confirmation Code"
                name="confirmationCode"
                autoComplete="confirmationCode"
                onChange={(event) => {
                  handleChange(event);
                  setWarnText("");
                }}
                onBlur={handleBlur}
                value={values.confirmationCode}
                error={errors.confirmationCode}
              />
              {errors.confirmationCode && (
                <Typography variant="caption" color="error">
                  {errors.confirmationCode}
                </Typography>
              )}
              {warnText !== "" && (
                <Typography variant="caption" color="error">
                  {warnText}
                </Typography>
              )}
              <LoaderButton
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                isLoading={isSubmitting}
                text="Confirm"
                loadingText="Confirming…"
                disabled={!enableButton(values)}
                fullWidth
              />
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

const Citizenship = ({ citizenship, setCitizenship }) => {
  const [value, setValue] = React.useState(country[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="combo-box"
      options={country}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Citizenship" variant="outlined" />}
    />
  );
};

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [terms, setTerms] = useState(false);
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const [citizenship, setCitizenship] = useState("");

  const SignupSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    lastName: yup
      .string()
      .min(2, "Last name is short")
      .max(50, "Last name is too long")
      .required("Last name is required"),
    firstName: yup
      .string()
      .min(2, "First name is short")
      .max(50, "First name too long")
      .required("First name is required"),
    password: yup
      .string()
      .min(8, "Password is too short")
      .max(50, "Password is too long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(8, "Password is too short")
      .max(50, "Password is too long")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const enable = (values) => {
    return (
      values.email &&
      values.password &&
      values.firstName &&
      values.lastName &&
      citizenship !== "" &&
      values.phoneNumber &&
      dateOfBirth !== null &&
      terms &&
      values.password === values.confirmPassword
    );
  };

  const [confiming, setConfirming] = useState(false);
  //singup form
  return !confiming ? (
    <Formik
      validationSchema={SignupSchema}
      initialValues={{
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        confiming: false,
      }}
      onSubmit={async (val, { setSubmitting }) => {
        try {
          await Auth.signUp({
            username: val.email,
            password: val.password,
            attributes: {
              //birthdate: new Date(dateOfBirth).toLocaleDateString(),
              locale: val.country,
              "custom:UserCreditails": "null",
              "custom:RuningTimeEntry": "null",
              name: val.firstName,
              family_name: val.lastName,
              phone_number: phone(val.phoneNumber),
              picture: "https://source.unsplash.com/random/256x256",
            },
          });
          setCredentials({
            email: val.email,
            password: val.password,
          });
          setSubmitting(true);
          setConfirming(true);
        } catch (e) {
          //An account with the given email already exists.
          setSubmitting(false);
          setMessage(e.message);
          console.warn(e);
        }
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched }) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                pl: 3,
                pr: 3,
              },
            }}
          >
            <Typography component="p" sx={{ color: "#666666", fontSize: 16 }}>
              Join Valpas NextApp
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    error={errors.firstName && touched.firstName}
                  />
                  {errors.firstName && touched.firstName && (
                    <Typography variant="caption" color="error">
                      {errors.firstName}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    error={errors.lastName && touched.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <Typography variant="caption" color="error">
                      {errors.lastName}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
                    <DatePicker
                      label="Date of Birth"
                      mask="__.__.____"
                      name="dateOfBirth"
                      onChange={(date) => setDateOfBirth(date)}
                      value={dateOfBirth}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          required
                          fullWidth
                          id="dateOfBirth"
                          label="Date of Birth"
                          name="dateOfBirth"
                          autoComplete="dateOfBirth"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Citizenship citizenship={citizenship} setCitizenship={setCitizenship} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email}
                  />
                  {errors.email && touched.email && (
                    <Typography variant="caption" color="error">
                      {errors.email}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    error={errors.phoneNumber && touched.phoneNumber}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Typography variant="caption" color="error">
                      {errors.phoneNumber}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
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
                    value={values.confirmPassword}
                    error={errors.confirmPassword && touched.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Typography variant="caption" color="error">
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={terms}
                        onChange={(event) => {
                          setTerms(event.target.checked);
                        }}
                        name="confiming"
                        color="primary"
                      />
                    }
                    label="I agree to Valpas NextApp's Terms of Service"
                  />
                  <Typography variant="caption" color="error">
                    {errors.terms && touched.terms && errors.terms}
                  </Typography>
                </Grid>
              </Grid>
              {message && (
                <Typography variant="caption" color="error">
                  {message}
                </Typography>
              )}
              <LoaderButton
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                isLoading={isSubmitting}
                text="Sign Up"
                loadingText="Creating…"
                disabled={!enable(values)}
                fullWidth
              />
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  ) : (
    <ConfirmForm email={credentials.email} password={credentials.password} />
  );
};

export default Signup;
