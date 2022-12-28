import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  TableCell,
  DialogContent,
  Button,
  DialogActions,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { UserCredentials, AllWorkSpaces } from "../../../models/index.js";

export const Addwork = ({ data, lang }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TableCell align="right">
      <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      <AddworkDialog data={data} open={open} handleClose={handleClose} lang={lang} />
    </TableCell>
  );
};

const AddworkDialog = ({ data, open = false, handleClose }) => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters")
      .required("Name is required"),
    description: yup
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(20, "Description must be at most 20 characters")
      .required("Description is required"),
  });
  const [warnText, setWarnText] = useState(null);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth={true}>
      <DialogTitle>
        <Typography>Add Work</Typography>
      </DialogTitle>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => addwork(data, values, setWarnText, handleClose)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty }) => (
          <>
            <DialogContent>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setWarnText(null);
                  }}
                  error={(touched.name && Boolean(errors.name)) || Boolean(warnText)}
                  helperText={touched.name && errors.name}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                />

                <TextField
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setWarnText(null);
                  }}
                  error={(touched.description && Boolean(errors.description)) || Boolean(warnText)}
                  helperText={touched.description && errors.description}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                />

                {warnText && (
                  <Typography color="error" variant="body2">
                    {warnText}
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting || !dirty || !isValid}
              >
                Add
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

const addwork = async (data, values, setWarnText, handleClose) => {
  const newWork = {
    name: values.name,
    description: values.description,
    id: String(Date.now()),
  };

  const isValid = (d) => {
    return (d.work || []).find((w) => w.name === newWork.name) === undefined;
  };

  await DataStore.save(
    AllWorkSpaces.copyOf(data, (updated) => {
      if (isValid(data)) {
        updated.work = [...(updated.work || []), newWork];
        handleClose();
      } else {
        setWarnText("Name is already taken");
      }
    })
  ).catch((err) => console.warn(err));
};
