import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
  TextField,
  Box,
  Grid,
  Collapse,
} from "@mui/material";
import { Formik } from "formik";
import { createUser } from "./functions";

const temporarypassword = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var length = 12;

  for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(temporarypassword());
  const [created, setCreated] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCreated(false);
    setPassword(temporarypassword());
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} fullWidth>
        Uusi käyttäjä
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Luo uusi käyttäjä</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Luo uusi käyttäjä. Käyttäjä saa sähköpostiin lähetetyn tilapäisen salasanan.
          </DialogContentText>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
            }}
            onSubmit={(values) => {
              createUser(values, password);
              setCreated(true);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: "480px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="first_name"
                      variant="outlined"
                      required
                      fullWidth
                      id="first_name"
                      label="Etunimi"
                      autoFocus
                      value={values.first_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="last_name"
                      label="Sukunimi"
                      name="last_name"
                      autoComplete="lname"
                      value={values.last_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Sähköposti"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => {
                        handleChange(e);
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Collapse in={created}>
                      <DialogContentText>Käyttäjä luotu onnistuneesti!</DialogContentText>
                      <DialogContentText>
                        Käyttäjänimi: {email}  Salasana: {password}
                      </DialogContentText>
                    </Collapse>
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" hidden={created}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary" hidden={created}>
                    Create
                  </Button>
                  <Button onClick={handleClose} color="primary" hidden={!created}>
                    Close
                  </Button>
                </DialogActions>
              </Box>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateUser;
