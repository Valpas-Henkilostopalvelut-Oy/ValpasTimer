import React, { useEffect, useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../../models";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  Box,
  Collapse,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

export const Creatework = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const validationSchema = Yup.object({
    name: Yup.string().min(4, "Name too short").max(24, "Name too long").required("Required"),
  });
  const [warnText, setWarnText] = useState("");

  return (
    <Fragment>
      <Button onClick={handleOpen}>Create Workspace</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Workspace</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => creatework({ name: values.name, setWarnText, handleClose })}
          >
            {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty, isSubmitting, errors, touched }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setWarnText("");
                  }}
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                {warnText && <Typography color="error">{warnText}</Typography>}
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" disabled={!isValid || !dirty || isSubmitting}>
                  Create
                </Button>
              </Box>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const creatework = async ({ name, setWarnText, handleClose }) => {
  await DataStore.query(AllWorkSpaces).then(async (res) => {
    const checkname = res.filter((item) => item.name === name).length > 0;

    if (!checkname) {
      await DataStore.save(
        new AllWorkSpaces({
          hourlyRate: { amount: 1500, currency: "EURO" },
          imageUrl: "http://aliquaauteproidentnonparia.net",
          memberships: [],
          name: name,
          workspaceSettings: { shortBreak: 15, dinnerBreak: 15 },
          workers: [],
          adminId: [],
        })
      )
        .then(() => handleClose())
        .catch((err) => console.warn(err));
    } else {
        setWarnText("Name already exists");
    }
  });
};
