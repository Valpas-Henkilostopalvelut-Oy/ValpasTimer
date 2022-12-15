import React, { useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models/index.js";
import { Button, Dialog, DialogContent, DialogTitle, Box, TextField, Typography, DialogActions } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { PropTypes } from "prop-types";

export const Creatework = ({
  lang = {
    create_work: {
      title: "Create workplace",
      name: "Name",
      create: "Create",
      cancel: "Cancel",
      errors: {
        is_too_short: "Too short name",
        is_too_long: "Too long name",
        is_required: "Name is required",
      },
    },
  },
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const validationSchema = Yup.object({
    name: Yup.string().min(4, lang.create_work.errors.is_too_short).max(24, lang.create_work.errors.is_too_long).required(lang.create_work.errors.is_required),
  });
  const [warnText, setWarnText] = useState("");

  return (
    <Fragment>
      <Button onClick={handleOpen}>{lang.create_work.title}</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={"xs"} fullWidth={true}>
        <DialogTitle id="form-dialog-title">{lang.create_work.title}</DialogTitle>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => creatework({ name: values.name, setWarnText, handleClose })}
        >
          {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty, isSubmitting, errors, touched }) => (
            <Fragment>
              <DialogContent>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    label={lang.create_work.name}
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
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {lang.create_work.cancel}
                </Button>
                <Button type="submit" disabled={!isValid || !dirty || isSubmitting} onClick={handleSubmit}>
                  {lang.create_work.create}
                </Button>
              </DialogActions>
            </Fragment>
          )}
        </Formik>
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

Creatework.propTypes = {
  lang: PropTypes.object,
};
