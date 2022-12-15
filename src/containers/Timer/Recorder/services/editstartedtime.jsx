import React, { useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../../models/index.js";
import { timeMaker } from "../../../../services/time.jsx";
import { PropTypes } from "prop-types";

const editDataStoreStartTime = async ({ newTime }) => {
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

export const EditStartTime = ({
  open = false,
  setOpen,
  timerTime = null,
  lang = {
    edit_start: {
      title: "Edit start time",
      start_time: "Start time",
      save: "Save",
      cancel: "Cancel",
    },
  },
}) => {
  const [tempTime, setTempTime] = useState(new Date(timerTime.timeInterval.start));
  const handleClose = async () => {
    setOpen(false);
  };

  const d = new Date(timerTime.timeInterval.start);
  const [value, setValue] = useState(
    `${String("0" + d.getHours()).slice(-2)}:${String("0" + d.getMinutes()).slice(-2)}`
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{lang.edit_start.title}</DialogTitle>
      <DialogContent>
        {timerTime !== null && (
          <TextField
            margin="dense"
            label={lang.edit_start.start_time}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
              let val = timeMaker(e, timerTime.timeInterval.start);
              setValue(`${String("0" + val.h).slice(-2)}:${String("0" + val.m).slice(-2)}`);
              setTempTime(new Date(timerTime.timeInterval.start).setHours(val.h, val.m, 0, 0));
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{lang.edit_start.cancel}</Button>
        <Button
          onClick={() => {
            editDataStoreStartTime({ newTime: tempTime });
            handleClose();
          }}
        >
          {lang.edit_start.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditStartTime.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  timerTime: PropTypes.object,
  lang: PropTypes.object,
};

