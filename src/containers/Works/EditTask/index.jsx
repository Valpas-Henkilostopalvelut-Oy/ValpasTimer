import React, { Fragment, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, TextField, Grid } from "@mui/material";
import { Formik } from "formik";
import LoaderButton from "../../../components/LoaderButton";
import { DataStore } from "aws-amplify";
import { Tasks } from "../../../models";
import { UserSelect, SelectDuration, SelectEndDate, SelectStartDate, SelectStartTime, WorkSelect } from "../CreateTask";

export const EditTask = ({ data = null, open = false, handleClose, reload }) => {
  const [user, setUser] = useState(data.user);
  const [work, setWork] = useState(data.workplace);
  const [startDate, setStartDate] = useState(data.startDay);
  const [endDate, setEndDate] = useState(data.endDay);
  const [duration, setDuration] = useState(data.duration);

  const isEnable = (t, desc, u, w, sd, ed, d) => {
    return t !== "" && desc !== "" && u !== null && w !== null && sd !== null && ed !== null && d !== "";
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-edit-task" aria-describedby="dialog-edit-task">
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          status: data.status,
        }}
        onSubmit={async (val, { setSubmitting }) => {
          await DataStore.query(Tasks, data.id)
            .then(async (task) => {
              await DataStore.save(
                Tasks.copyOf(task, (updated) => {
                  updated.title = val.title;
                  updated.description = val.description;
                  updated.user = user;
                  updated.workplace = work;
                  updated.time = new Date(startDate).toLocaleTimeString();
                  updated.username = user.userId;
                  updated.interval = {
                    start: new Date(startDate).toISOString(),
                    end: new Date(endDate).toISOString(),
                    duration: duration,
                  };
                })
              );
              handleClose();
              reload();
            })
            .catch((err) => {
              setSubmitting(false);
              console.warn(err);
            });
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Fragment>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent component="main">
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: 350 }}>
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
                      multiline
                      rows={4}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UserSelect setUser={setUser} id={data.user.userId} />
                  </Grid>
                  <Grid item xs={12}>
                    <WorkSelect setWork={setWork} id={data.workplace.workId} />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectStartTime
                      setStartTime={setStartDate}
                      startTime={new Date(startDate).setHours(
                        data.startTime.slice(0, 2),
                        data.startTime.slice(3, 5),
                        data.startTime.slice(6, 8)
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectDuration setDuration={setDuration} duration={duration} />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectStartDate setStartDate={setStartDate} startDate={new Date(startDate)} />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectEndDate setEndDate={setEndDate} endDate={new Date(endDate)} />
                  </Grid>
                  <Grid item xs={12}>
                    <LoaderButton
                      type="submit"
                      text="Save"
                      fullWidth
                      variant="contained"
                      color="primary"
                      isLoading={isSubmitting}
                      disabled={!isEnable(values.title, values.description, user, work, startDate, endDate, duration)}
                    />
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
