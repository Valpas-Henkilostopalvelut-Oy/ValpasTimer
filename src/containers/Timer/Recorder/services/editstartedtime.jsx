import React, { useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models";
import { timeMaker } from "../../../../services/time.jsx";

const editDataStoreStartTime = async ({ newTime }) => {
  await Auth.currentAuthenticatedUser()
    .then(async (user) => {
      if (user.attributes["custom:RuningTimeEntry"] !== "null") {
        await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"])
          .then(async (time) => {
            console.log(time);
            await DataStore.save(
              TimeEntry.copyOf(time, (updated) => {
                updated.timeInterval.start = new Date(newTime).toISOString();
              })
            );
          })
          .catch((err) => console.warn(err));
      }
    })
    .catch((e) => console.warn(e));
};

export const EditStartTime = ({ open = false, setOpen, timerTime = null }) => {
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
      <DialogTitle id="alert-dialog-title">Edit start time</DialogTitle>
      <DialogContent>
        {timerTime !== null && (
          <TextField
            label="Start time"
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            editDataStoreStartTime({ newTime: tempTime });
            handleClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
