import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

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
      .max(24, lang.errors.is_too_long)
      .required(lang.errors.is_required),
  });

  <Formik initialValues={{ name: data.name }} validationSchema={validationSchema}>
    {({ values, handleChange, handleBlur, handleSubmit, errors, isSubmitting, isValid, dirty, touched }) => (
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="name"
          label={lang.label}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          error={touched.name && Boolean(errors.name)}
        />
        <Button type="submit" disabled={isSubmitting || !isValid || !dirty}>
          {lang.buttons.save}
        </Button>
      </Box>
    )}
  </Formik>;
};
