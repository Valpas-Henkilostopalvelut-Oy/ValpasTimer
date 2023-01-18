import React, { useState } from "react";
import { InputBase, TableRow, TableCell, IconButton, Typography, Collapse, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { DataStore, Auth } from "aws-amplify";
import { UserCredentials } from "../../../../models";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";

const onToVerify = async (email) => {
  return await Auth.currentAuthenticatedUser().then(async (user) => {
    return await Auth.updateUserAttributes(user, {
      email: email,
    });
  });
};
const onVerify = async (code, closeVerify) => {
  await Auth.currentAuthenticatedUser().then(async (user) => {
    await Auth.verifyCurrentUserAttributeSubmit("email", code).then(() => {
      closeVerify();
    });
  });
};

const Editemail = ({ email, openVerify }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <Formik
      initialValues={{
        email: email,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await onToVerify(values.email).then(() => {
          openVerify();
          setDisabled(true);
        });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Box
          component={"form"}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{
              width: "100%",
              height: "100%",
              borderBottom: "1px solid gray",
              marginBottom: "5px",
              padding: "0 8px",
              fontSize: "14px",
              lineHeight: "1.5",
              transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
              "&:focus": {
                borderColor: "#80bdff",
                outline: "0",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
              },
            }}
            disabled={disabled}
            id="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.email && errors.email)}
          />
          <Button type="submit">Verify</Button>
        </Box>
      )}
    </Formik>
  );
};

const Verifyemail = ({ setVerify, verify = false }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={3}
        padding="none"
        sx={{
          borderBottom: !verify && "none",
        }}
      >
        <Collapse in={verify} timeout="auto" unmountOnExit>
          <Formik
            initialValues={{
              code: "",
            }}
            validationSchema={Yup.object().shape({
              code: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await onVerify(values.code, setVerify);
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Box component={"form"} sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                <InputBase
                  sx={{
                    width: "40%",
                    height: "100%",
                    borderBottom: "1px solid gray",
                    padding: "0 8px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                    "&:focus": {
                      borderColor: "#80bdff",
                      outline: "0",
                      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
                    },
                  }}
                  id="code"
                  name="code"
                  label="Code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button sx={{ marginTop: "8px" }} variant="contained" type="submit" disabled={isSubmitting}>
                  Verify
                </Button>
              </Box>
            )}
          </Formik>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export const Email = ({ data, cognito, canedit = false, edit, lang }) => {
  const [verify, setVerify] = useState(false);
  const email = cognito.email;
  const [emailValue, setEmailValue] = useState(email !== undefined ? email : "");

  const openVerify = () => setVerify(true);
  return (
    <>
      <TableRow>
        <TableCell width={"35%"}>{lang.email}</TableCell>
        <TableCell>
          {edit ? (
            <Editemail email={emailValue} setEmail={setEmailValue} openVerify={openVerify} />
          ) : (
            <Typography
              variant="body2"
              sx={{
                borderBottom: "1px solid #fff",
                padding: "4px 8px 5px 8px",
                fontSize: "14px",
                lineHeight: "1.5",
                transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
              }}
            >
              {emailValue}
            </Typography>
          )}
        </TableCell>
      </TableRow>
      <Verifyemail email={emailValue} setVerify={setVerify} verify={verify} />
    </>
  );
};
