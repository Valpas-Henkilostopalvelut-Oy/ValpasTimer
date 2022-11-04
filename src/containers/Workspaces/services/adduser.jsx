import React, { useState } from "react";
import { DataStore } from "aws-amplify";
import {
  IconButton,
  Dialog,
  DialogTitle,
  TableCell,
  DialogContent,
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { UserCredentials, AllWorkSpaces } from "../../../models";

export const Adduser = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <TableCell align="right">
      <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      <AdduserDialog data={data} open={open} handleClose={handleOpen} />
    </TableCell>
  );
};

const AdduserDialog = ({ data, open = false, handleClose }) => {
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
  });
  const [warnText, setWarnText] = useState("");

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant="h6">Add User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => adduser({ data: data, email: values.email, setWarnText, handleClose })}
        >
          {({ values, handleBlur, handleChange, handleSubmit, isValid, dirty, isSubmitting, errors, touched }) => (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                name="email"
                label="Email"
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
              />
              {warnText && <Typography color="error">{warnText}</Typography>}
              {touched.email && errors.email && <Typography color="error">{errors.email}</Typography>}
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Add</Button>
            </Box>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const adduser = async ({ data, email = "", setWarnText, handleClose }) => {
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
            .catch((err) => console.log(err));
        } else {
          setWarnText("User already exists in this workspace");
        }
      } else {
        setWarnText("User not found");
      }
    })
    .catch((err) => console.log(err));
};
