import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry } from "../../../../models";
import WorkspaceSelect from "../../../../components/WorkSpaceSelect/index.jsx";
import { timeMaker } from "../../../../services/time.jsx";

const BreakPopover = ({ id = "", open = false, handleClose, anchorEl = null }) => {
  return (
    <Menu
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MenuItem onClick={handleClose}>Start break</MenuItem>
    </Menu>
  );
};

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

const updateTime = ({ startTime, setTime }) => {
  const timeDiff = new Date(Date.parse(new Date()) - Date.parse(new Date(startTime)));

  console.log(timeDiff);

  setTime({
    seconds: timeDiff.getUTCSeconds(),
    minutes: timeDiff.getUTCMinutes(),
    hours: timeDiff.getUTCHours(),
  });
};

const EditStartTime = ({ open = false, setOpen, setTime, timerTime, startTime }) => {
  const handleClose = async () => {
    updateTime({
      startTime: startTime,
      setTime: setTime,
    });
    setOpen(false);
  };

  const d = new Date(startTime);
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
        {startTime !== null && (
          <TextField
            label="Start time"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
              let val = timeMaker(e, startTime);
              setValue(`${String("0" + val.h).slice(-2)}:${String("0" + val.m).slice(-2)}`);
              editDataStoreStartTime({ newTime: new Date(startTime).setHours(val.h, val.m, 0, 0) });
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export const Timer = ({ reload }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [started, setStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let isActive = false;

    const checkActiveTime = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user.attributes["custom:RuningTimeEntry"] !== "null") {
          await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"]).then((ongoingTime) => {
            const timeDiff = new Date(Date.parse(new Date()) - Date.parse(ongoingTime.timeInterval.start));
            setStartTime(new Date(ongoingTime.timeInterval.start));

            setTime({
              seconds: timeDiff.getUTCSeconds(),
              minutes: timeDiff.getUTCMinutes(),
              hours: timeDiff.getUTCHours(),
            });

            setStarted(true);
          });
        }
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && checkActiveTime();

    return () => (isActive = true);
  }, []);

  useEffect(() => {
    let isCanceled = false;

    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        !isCanceled && setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    started && advanceTime();

    return () => (isCanceled = true);
  }, [time, started]);

  const addItem = async () => {
    setStarted(!started);
    setTimeout(() => {
      setTime({
        seconds: 0,
        minutes: 0,
        hours: 0,
      });
    }, 1000);
    try {
      const user = await Auth.currentAuthenticatedUser();

      const startTimeEntry = async () => {
        const newStartTime = await DataStore.save(
          new TimeEntry({
            description: description,
            userId: user.username,
            workspaceId: selectedOption,
            timeInterval: {
              duration: "",
              end: new Date(new Date().setMilliseconds(0)).toISOString(),
              start: new Date(new Date().setMilliseconds(0)).toISOString(),
            },
            isActive: true,
            isLocked: false,
            isSent: false,
            isConfirmed: false,
            billable: true,
          })
        );

        const original = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);

        await DataStore.save(
          UserCredentials.copyOf(original, (updated) => {
            updated.activeTimeEntry = newStartTime.id;
          })
        );

        await Auth.updateUserAttributes(user, {
          "custom:RuningTimeEntry": newStartTime.id,
        });
      };

      const endTimeEntry = async () => {
        const oldActiveTime = await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"]);

        await DataStore.save(
          TimeEntry.copyOf(oldActiveTime, (updated) => {
            updated.isActive = false;
            updated.timeInterval.end = new Date().toISOString();
          })
        );

        const original = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);

        await DataStore.save(
          UserCredentials.copyOf(original, (updated) => {
            updated.activeTimeEntry = "null";
          })
        );

        await Auth.updateUserAttributes(user, {
          "custom:RuningTimeEntry": "null",
        });

        reload();
      };

      if (user.attributes["custom:RuningTimeEntry"] === "null") {
        startTimeEntry();
      } else {
        endTimeEntry();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openBreak = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //description, workselect, start stop
  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <WorkspaceSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </Grid>

      <Grid item xs={4} md={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
          {String("0" + time.hours).slice(-2)}:{String("0" + time.minutes).slice(-2)}:
          {String("0" + time.seconds).slice(-2)}
        </Typography>
        {startTime && <EditStartTime open={open} setOpen={setOpen} setTime={setTime} startTime={startTime} />}
      </Grid>

      <Grid item xs={4} md={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add break
        </Button>
        <BreakPopover id={id} open={openBreak} handleClose={handleClose} anchorEl={anchorEl} />
      </Grid>

      <Grid item xs={4} md={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={addItem} variant="contained">
          {!started ? "Start" : "Stop"}
        </Button>
      </Grid>
    </Grid>
  );
};