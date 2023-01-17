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
import { PropTypes } from "prop-types";

const phone = (phone) => {
  if (String(phone).length === 12) {
    return `+${phone}`;
  } else if (String(phone).length === 10) {
    return `+358${String(phone).slice(1)}`;
  } else if (String(phone).length === 9) {
    return `+358${String(phone)}`;
  } else return null;
};

const ConfirmForm = ({ password, email }) => {
  const { userHasAuthenticated, langValue } = useAppContext();
  const navigate = useNavigate();
  const [warnText, setWarnText] = useState("");

  //validate form
  const validationSchema = yup.object().shape({
    confirmationCode: yup.string().required(langValue.confirm.is_required),
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
              {langValue.confirm.title}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: "300px" }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="confirmationCode"
                label={langValue.confirm.code}
                name="confirmationCode"
                autoComplete="confirmationCode"
                onChange={(event) => {
                  handleChange(event);
                  setWarnText("");
                }}
                onBlur={handleBlur}
                value={values.confirmationCode}
                error={touched.confirmationCode && Boolean(errors.confirmationCode)}
                helperText={touched.confirmationCode && errors.confirmationCode}
              />
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
                text={langValue.confirm.confirm}
                loadingText={langValue.confirm.confirming}
                disabled={!isValid || !dirty}
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
  const { langValue } = useAppContext();

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={citizenship}
      onInputChange={(event, newInputValue) => {
        setCitizenship(newInputValue);
      }}
      id="combo-box"
      options={country}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label={langValue.register.citizenship} variant="outlined" />}
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
  const { langValue } = useAppContext();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .min(9, langValue.register.errors.phone_number.is_too_short)
      .max(12, langValue.register.errors.phone_number.is_too_long)
      .matches(phoneRegExp, langValue.register.errors.phone_number.is_invalid)
      .required(langValue.register.errors.phone_number.is_required),
    email: yup
      .string()
      .email(langValue.register.errors.invalid_email)
      .required(langValue.register.errors.email_is_required),
    lastName: yup
      .string()
      .min(2, langValue.register.errors.last_name.is_too_short)
      .max(50, langValue.register.errors.last_name.is_too_long)
      .required(langValue.register.errors.last_name.is_required),
    firstName: yup
      .string()
      .min(2, langValue.register.errors.first_name.is_too_short)
      .max(50, langValue.register.errors.first_name.is_too_long)
      .required(langValue.register.errors.first_name.is_required),
    password: yup
      .string()
      .min(8, langValue.register.errors.password.is_too_short)
      .max(50, langValue.register.errors.password.is_too_long)
      .required(langValue.register.errors.password.is_required),
    confirmPassword: yup
      .string()
      .min(8, langValue.register.errors.password_confirmation.is_too_short)
      .max(50, langValue.register.errors.password_confirmation.is_too_long)
      .required(langValue.register.errors.password_confirmation.is_required)
      .oneOf([yup.ref("password"), null], langValue.register.errors.password_confirmation.does_not_match),
  });

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
              birthdate: new Date(dateOfBirth).toLocaleDateString(),
              locale: null,
              "custom:UserCreditails": "null",
              "custom:RuningTimeEntry": "null",
              "custom:nationality": citizenship,
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
          if (e.message === "An account with the given email already exists.") {
            setMessage(langValue.register.errors.email_already_exists);
          }
          console.warn(e);
        }
      }}
    >
      {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched, isValid, dirty }) => (
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
              {langValue.register.title}
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
                    label={langValue.register.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label={langValue.register.last_name}
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
                    <DatePicker
                      label={langValue.register.date_of_birth}
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
                          label={langValue.register.date_of_birth}
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
                    label={langValue.register.email}
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNumber"
                    label={langValue.register.phone_number}
                    type="number"
                    placeholder="+358123456789"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label={langValue.register.password}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label={langValue.register.password_confirmation}
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
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
                    label={langValue.register.agree}
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
                text={langValue.register.register}
                loadingText="Creating…"
                disabled={!isValid || !dirty || isSubmitting || !terms || !dateOfBirth}
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

Signup.propTypes = {
  langValue: PropTypes.object,
};

ConfirmForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

Citizenship.propTypes = {
  citizenship: PropTypes.string,
  setCitizenship: PropTypes.func,
};

export default Signup;
