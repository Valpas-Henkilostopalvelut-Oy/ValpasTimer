import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Grid,
  CircularProgress,
  Button,
  Modal,
} from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { useAppContext } from "../../services/contextLib";
import { Formik } from "formik";
import * as yup from "yup";
import LoaderButton from "../../components/LoaderButton";
import { UserCredentials } from "../../models";
import ChangePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";

const ModalDelete = ({ open, setOpen }) => {
  const { userHasAuthenticated, setGroups } = useAppContext();
  const { navigate } = useNavigate();

  const handleDelete = async () => {
    await Auth.deleteUser()
      .then(async (data) => {
        console.log(data);
        setOpen(false);
        await DataStore.stop();
        await Auth.signOut();
        setGroups([]);
        userHasAuthenticated(false);
        navigate("login", { replace: true });
        await DataStore.clear();
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="modal-title">
          Delete Account
        </Typography>
        <Typography variant="subtitle1" id="modal-description">
          Are you sure you want to delete your account?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

const phone = (phone) => {
  if (phone.length === 13) {
    return `${phone}`;
  } else if (phone.length === 10) {
    return `+358${phone.slice(1)}`;
  } else if (phone.length === 9) return `+358${phone}`;
};

const iban = (iban) => {
  let ibanNumber = iban
    .toUpperCase()
    .split("")
    .filter((i) => i !== " ");
  if (ibanNumber.length === 18) {
    console.log(
      `${ibanNumber.slice(0, 4).join("")} ${ibanNumber.slice(4, 8).join("")} ${ibanNumber
        .slice(8, 12)
        .join("")} ${ibanNumber.slice(12, 16).join("")} ${ibanNumber.slice(16, 18).join("")}`
    );
  }
};

const Settings = () => {
  //Profile settings form
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const valSchema = yup.object().shape({
    lastName: yup
      .string()
      .min(3, "*Last name must have at least 2 characters")
      .max(100, "*Last names can't be longer than 100 characters")
      .required("*Last name is required"),

    firstName: yup
      .string()
      .min(3, "*First name must have at least 2 characters")
      .max(100, "*Frist names can't be longer than 100 characters")
      .required("*First names is required"),

    email: yup
      .string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required"),

    phoneNumber: yup.string().matches(phoneRegExp, "*Phone number is not valid").required("*Phone number required"),
  });

  const [initValues, setIniValues] = useState(null);

  useEffect(() => {
    let isActive = false;

    const loadSettings = async () => {
      let loggedUser = await Auth.currentAuthenticatedUser();
      console.log();
      setIniValues({
        lastName: loggedUser.attributes.family_name,
        firstName: loggedUser.attributes.name,
        email: loggedUser.attributes.email,
        phoneNumber: phone(loggedUser.attributes.phone_number),
        iban: loggedUser.attributes["custom:iban"] === undefined ? "" : loggedUser.attributes["custom:iban"],
        address: "",
        state: "",
        city: "",
        zipCode: "",
        contry: "",
      });
    };

    !isActive && loadSettings();
    return () => (isActive = true);
  }, []);

  //enable save button when form is valid
  const enableSaveButton = (values) => {
    const { lastName, firstName, email, phoneNumber } = values;
    return !(lastName && firstName && email && phoneNumber);
  };

  //Two buttons for changing password and delete account
  const [changePassword, setChangePassword] = useState(false);
  const [open, setOpen] = useState(false);

  return initValues !== null ? (
    !changePassword ? (
      <Formik
        initialValues={initValues}
        validationSchema={valSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.updateUserAttributes(user, {
              name: values.firstName,
              family_name: values.lastName,
              phone_number: phone(values.phoneNumber),
              email: values.email,
              "custom:iban": iban(values.iban),
            });

            const dataStoreUser = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);
            await DataStore.save(
              UserCredentials.copyOf(dataStoreUser, (updated) => {
                updated.profile.first_name = values.firstName;
                updated.profile.last_name = values.lastName;
                updated.profile.email = values.email;
                updated.profile.phone_number = phone(values.phoneNumber);
              })
            );

            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
            console.warn(error);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Profile Settings
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 3,
                  width: "100%",
                  maxWidth: "sm",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid container spacing={2}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="fname"
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
                      id="iban"
                      label="IBAN"
                      name="iban"
                      autoComplete="iban"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.iban}
                      error={errors.iban && touched.iban}
                    />
                    {errors.iban && touched.iban && (
                      <Typography variant="caption" color="error">
                        {errors.iban}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      error={errors.address && touched.address}
                    />
                    {errors.address && touched.address && (
                      <Typography variant="caption" color="error">
                        {errors.address}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="state"
                      label="State"
                      name="state"
                      autoComplete="state"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                      error={errors.state && touched.state}
                    />
                    {errors.state && touched.state && (
                      <Typography variant="caption" color="error">
                        {errors.state}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      autoComplete="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      error={errors.city && touched.city}
                    />
                    {errors.city && touched.city && (
                      <Typography variant="caption" color="error">
                        {errors.city}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="zipCode"
                      label="Zip Code"
                      name="zipCode"
                      autoComplete="zipCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                      error={errors.zipCode && touched.zipCode}
                    />
                    {errors.zipCode && touched.zipCode && (
                      <Typography variant="caption" color="error">
                        {errors.zipCode}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      autoComplete="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      error={errors.country && touched.country}
                    />
                    {errors.country && touched.country && (
                      <Typography variant="caption" color="error">
                        {errors.country}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <LoaderButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={enableSaveButton(values) && !isSubmitting}
                  isLoading={isSubmitting}
                  loadingText="Saving..."
                  text="Save"
                  sx={{
                    mt: 3,
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => {
                      setChangePassword(true);
                    }}
                  >
                    Change Password
                  </Button>
                  <Button
                    fullWidth
                    color="secondary"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Delete Account
                  </Button>
                  <ModalDelete open={open} setOpen={setOpen} />
                </Box>
              </Box>
            </Box>
          </Container>
        )}
      </Formik>
    ) : (
      <ChangePassword changePassword={changePassword} setChangePassword={setChangePassword} />
    )
  ) : (
    <Container>
      {/*loading container*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Settings;
