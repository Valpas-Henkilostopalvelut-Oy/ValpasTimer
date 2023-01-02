import React, { useState } from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { AllWorkSpaces } from "../../../models";
import { DataStore } from "aws-amplify";

const changeworkname = async (data, setWarn, newName, close) => {
  await DataStore.query(AllWorkSpaces).then(async (res) => {
    let c = res.filter((item) => item.name === newName);
    let d = c.filter((item) => item.id !== data.id);

    if (c.length === 0) {
      await DataStore.save(
        AllWorkSpaces.copyOf(data, (updated) => {
          updated.name = newName;
        })
      ).catch((err) => console.warn(err));
    } else if (d.length === 0) {
      setWarn("same name");
    } else {
      setWarn("name already exists");
    }
  });
};

export const ChangeworkName = ({
  data,
  lang = {
    label: "Name",
    errors: {
      is_too_short: "Too short name",
      is_too_long: "Too long name",
      is_required: "Name is required",
    },
    buttons: {
      save: "Save",
    },
  },
}) => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(4, lang.errors.is_too_short)
      .max(50, lang.errors.is_too_long)
      .required(lang.errors.is_required),
  });

  const [warn, setWarn] = useState("");

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    changeworkname(data, setWarn, values.name);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Formik initialValues={{ name: data.name }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur, handleSubmit, errors, isSubmitting, isValid, dirty, touched }) => (
        <Grid container component="form" onSubmit={handleSubmit} spacing={1}>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              name="name"
              label={lang.label}
              value={values.name}
              onChange={(e) => {
                handleChange(e);
              }}
              onBlur={handleBlur}
              fullWidth
              error={(touched.name && Boolean(errors.name)) || warn}
              helperText={(touched.name && errors.name) || warn}
            />
          </Grid>

          <Grid item xs={3} alignItems="flex-end" display="flex">
            <Button type="submit" disabled={isSubmitting || !isValid || !dirty} fullWidth variant="contained">
              {lang.buttons.save}
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};
