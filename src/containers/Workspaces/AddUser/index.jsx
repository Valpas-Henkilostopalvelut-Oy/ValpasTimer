import React, { useState } from "react";
import { API, DataStore, Auth } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../../models";
import { Box, TextField, Typography, Modal } from "@mui/material";
import { Formik } from "formik";
import { useAppContext } from "../../../services/contextLib.jsx";
import * as yup from "yup";
import LoaderButton from "../../../components/LoaderButton/index.jsx";

export const AddUser = ({ open, setOpen, id, reload }) => {
  const { groups } = useAppContext();
  const [message, setMessage] = useState(null);

  //validate email
  const validateEmail = yup.object().shape({
    email: yup
      .string()
      .min(2, "Email is too short")
      .max(50, "Email is too long")
      .email("Invalid email format")
      .required("Email is required"),
  });

  //disable button if email is invalid
  const enable = (values) => {
    return values.email.length > 0;
  };

  //modal for adding users to workspace

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validateEmail}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              if (groups.includes("Admins")) {
                await API.get("AdminQueries", "/listUsers", {
                  queryStringParameters: {
                    filter: "email",
                  },
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
                  },
                })
                  .then(async (data) => {
                    const foundUser = data.Users.find(
                      (u) => u.Attributes.find((a) => a.Name === "email").Value === values.email
                    );

                    if (foundUser !== undefined) {
                      const credentialsId = foundUser.Attributes.find((a) => a.Name === "custom:UserCreditails").Value;
                      const credentials = await DataStore.query(UserCredentials, credentialsId);
                      const original = await DataStore.query(AllWorkSpaces, id);

                      if (groups.includes("Admins") && credentials !== undefined && original !== undefined) {
                        if (
                          original.memberships.filter((m) => m.userId === credentials.userId).length === 0 &&
                          credentials.memberships.filter((m) => m.workspaceId === original.id).length === 0
                        ) {
                          //add user to workspace
                          await DataStore.save(
                            AllWorkSpaces.copyOf(original, (updated) => {
                              updated.workers.push(credentials.userId);
                              updated.memberships.push({
                                hourlyRate: original.hourlyRate,
                                membershipStatus: "",
                                membershipType: "USER",
                                userId: credentials.userId,
                                targetId: original.id,
                              });
                            })
                          );
                          await DataStore.save(
                            UserCredentials.copyOf(credentials, (updated) => {
                              updated.memberships.push({
                                hourlyRate: original.hourlyRate,
                                costRate: {},
                                membershipStatus: "",
                                membershipType: "WORKSPACE",
                                userId: credentials.userId,
                                targetId: id,
                              });
                            })
                          );
                          setMessage("User added to workspace");
                          reload();
                          setOpen(false);
                        } else {
                          setMessage("User is already a member of this workspace");
                        }
                      }
                    } else {
                      setMessage("User does not exist");
                    }
                  })
                  .catch((err) => console.warn(err));
              }
            } catch (error) {
              setSubmitting(false);
              console.warn(error);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched }) => (
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
              onSubmit={handleSubmit}
              component="form"
            >
              <Typography variant="h6">Add User</Typography>
              <TextField
                id="email"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                fullWidth
                margin="normal"
                variant="outlined"
                error={touched.email && errors.email}
              />
              {message !== null && (
                <Typography variant="caption" color="error">
                  {message}
                </Typography>
              )}{" "}
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
                text="Add user"
                loadingText="Adding..."
                disabled={!enable(values)}
              />
            </Box>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
