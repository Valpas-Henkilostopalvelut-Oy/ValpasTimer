import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../../models/index.js";
import { PropTypes } from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimeField, LocalizationProvider } from "@mui/x-date-pickers";
import fi from "date-fns/locale/fi";

const editDataStoreStartTime = async (newTime) => {
  await Auth.currentAuthenticatedUser()
    .then(async (user) => {
      const creditailsId = user.attributes["custom:UserCreditails"];

      await DataStore.query(UserCredentials, creditailsId)
        .then(async (data) => {
          const timeEntryId = data.activeTimeEntry;

          await DataStore.query(TimeEntry, timeEntryId)
            .then(async (data) => {
              await DataStore.save(
                TimeEntry.copyOf(data, (update) => {
                  update.timeInterval.start = new Date(newTime).toISOString();
                })
              );
            })
            .catch((error) => console.warn(error));
        })
        .catch((error) => console.warn(error));
    })
    .catch((e) => console.warn(e));
};

export const EditStartTime = (props) => {
  const {
    isStarted,
    time,
    timerTime = null,
    lang = {
      edit_start: {
        title: "Edit start time",
        start_time: "Start time",
        save: "Save",
        cancel: "Cancel",
      },
    },
  } = props;

  const [open, setOpen] = useState(false);
  const handleClose = async () => setOpen(false);
  const d = timerTime ? new Date(timerTime.timeInterval.start) : new Date();
  const [value, setValue] = useState(d);

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        onClick={() => setOpen(true)}
        sx={{
          [isStarted ? "&:hover" : ""]: {
            cursor: "pointer",
            textDecoration: "underline",
          },
        }}
      >
        {time.hours < 10 ? "0" + time.hours : time.hours}:{time.minutes < 10 ? "0" + time.minutes : time.minutes}:
        {time.seconds < 10 ? "0" + time.seconds : time.seconds}
      </Typography>
      <Dialog
        open={open && isStarted}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{lang.edit_start.title}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <TimeField label={lang.edit_start.start_time} value={value} onChange={(e) => setValue(e.target.value)} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{lang.edit_start.cancel}</Button>
          <Button
            onClick={() => {
              editDataStoreStartTime(value);
              handleClose();
            }}
          >
            {lang.edit_start.save}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditStartTime.propTypes = {
  timerTime: PropTypes.object,
  lang: PropTypes.object,
};
