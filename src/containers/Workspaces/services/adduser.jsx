import React, { useState } from "react";
import { DataStore } from "aws-amplify";
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
import { Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { UserCredentials, AllWorkSpaces } from "../../../models";

export const Adduser = ({ data, lang }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <TableCell align="right">
      <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      <AdduserDialog data={data} open={open} handleClose={handleOpen} lang={lang} />
    </TableCell>
  );
};

const AdduserDialog = ({
  data,
  open = false,
  handleClose,
  lang = {
    add_user: {
      title: "Add worker",
      email: "Email",
      add: "Add",
      cancel: "Cancel",
      errors: {
        invalid_email: "Email is invalid",
        email_is_required: "Email is required",
      },
    },
  },
}) => {
  const validationSchema = yup.object({
    email: yup.string().email(lang.add_user.errors.invalid_email).required(lang.add_user.errors.email_is_required),
  });
  const [warnText, setWarnText] = useState("");

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth={true}>
      <DialogTitle>
        <Typography variant="h6">{lang.add_user.title}</Typography>
      </DialogTitle>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => adduser({ data: data, email: values.email, setWarnText, handleClose })}
      >
        {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty, isSubmitting, errors, touched }) => (
          <>
            <DialogContent>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="email"
                  label={lang.add_user.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setWarnText("");
                  }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                {warnText && (
                  <Typography color="error" variant="caption">
                    {warnText}
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{lang.add_user.cancel}</Button>
              <Button onClick={handleSubmit} disabled={!isValid || !dirty || isSubmitting}>
                {lang.add_user.add}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

const adduser = async ({
  data,
  email = "",
  setWarnText,
  handleClose,
  lang = {
    user_already_exists: "User already exists in this workspace",
    user_not_found: "User not found",
  },
}) => {
  await DataStore.query(UserCredentials)
    .then(async (users) => {
      let checkdublicate = users.filter((user) => user.profile.email === email).length > !1;
      if (checkdublicate) {
        var user = users.find((user) => user.profile.email === email);
        var userId = user.userId;
        var checkdublicateinwork = data.workers.filter((workers) => workers === userId).length > 0;

        if (!checkdublicateinwork) {
          await DataStore.save(
            AllWorkSpaces.copyOf(data, (updated) => {
              updated.workers.push(userId);
            })
          )
            .then(() => {
              handleClose();
            })
            .catch((err) => console.warn(err));
        } else {
          setWarnText(lang.user_already_exists);
        }
      } else {
        setWarnText(lang.user_not_found);
      }
    })
    .catch((err) => console.warn(err));
};
