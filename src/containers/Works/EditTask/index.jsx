import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Container,
  Toolbar,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  DialogContentText,
  CssBaseline,
  DialogActions,
  InputLabel,
  Select,
  FormControl,
  Grid,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Formik } from "formik";
import LoaderButton from "../../../components/LoaderButton";
import { DataStore } from "aws-amplify";
import { Tasks } from "../../../models";
import { UserSelect, SelectDuration, SelectEndDate, SelectStartDate, SelectStartTime, WorkSelect } from "../CreateTask";

export const EditTask = ({ data = null, open = false, handleClose }) => {
  const [user, setUser] = useState(data.user);
  const [work, setWork] = useState(data.workplace);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState("");
  console.log(data);
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-edit-task" aria-describedby="dialog-edit-task">
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          status: data.status,
        }}
        onSubmit={(val) => {
          console.log(val);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Fragment>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent component="main">
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UserSelect setUser={setUser} id={data.user.userId}/>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
          </Fragment>
        )}
      </Formik>
    </Dialog>
  );
};
