import React, { useEffect, useState, Fragment } from "react";
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
  Popover,
} from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry, Break, AllWorkSpaces } from "../../../../models";
import { WorklistSelect } from "../../../../components/WorkSpaceSelect/index.jsx";
import { timeMaker } from "../../../../services/time.jsx";

const addBreak = async ({ time, timeEntryId }) => {};

const Row = ({ time, close, timeId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    close();
  };

  const reasone = ["Lunch", "Own going", "Short break"];

  return (
    <Fragment>
      <MenuItem onClick={handleClick}>{time.title}</MenuItem>
      <Menu id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        {reasone.map((reasone, k) => (
          <MenuItem key={k} onClick={handleClose}>
            {reasone}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

const BreakPopover = ({ id = "", open = false, handleClose, anchorEl = null, timeId }) => {
  const times = [
    { title: "15 min", value: Break.MIN15 },
    { title: "30 min", value: Break.MIN30 },
    { title: "45 min", value: Break.MIN45 },
    { title: "1 hour", value: Break.H1 },
  ];
  console.log();
  return (
    <Menu
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {times.map((time, k) => (
        <Row key={k} time={time} close={handleClose} />
      ))}
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

const EditStartTime = ({ open = false, setOpen, timerTime }) => {
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

export const Timer = ({ reload }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [started, setStarted] = useState(false);
  const [sel, setSel] = useState(null);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [timerTime, setTimerTime] = useState(null);

  useEffect(() => {
    let isActive = false;

    const checkActiveTime = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user.attributes["custom:RuningTimeEntry"] !== "null") {
          await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"]).then((ongoingTime) => {
            const timeDiff = new Date(Date.parse(new Date()) - Date.parse(ongoingTime.timeInterval.start));
            setTimerTime(ongoingTime);

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
        await DataStore.save(
          new TimeEntry({
            breaks: [],
            description: description,
            userId: user.username,
            workspaceId: sel,
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
        )
          .then(async (time) => {
            await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"])
              .then(async (userCred) => {
                await DataStore.save(
                  UserCredentials.copyOf(userCred, (updated) => {
                    updated.activeTimeEntry = time.id;
                  })
                )
                  .then(async () => {
                    await Auth.updateUserAttributes(user, {
                      "custom:RuningTimeEntry": time.id,
                    }).catch((err) => console.warn(err));
                  })
                  .catch((err) => console.warn(err));

                await DataStore.query(AllWorkSpaces, time.workspaceId).then((workspace) => {
                  /*startTimer({
                    user: `${user.attributes.name} ${user.attributes.family_name}`,
                    email: user.attributes.email,
                    timeStart: time.timeInterval.start,
                    workname: workspace.name,
                  });*/
                });
              })
              .catch((err) => console.warn(err));
          })
          .catch((err) => console.warn(err));
      };

      const endTimeEntry = async () => {
        await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"])
          .then(async (time) => {
            await DataStore.save(
              TimeEntry.copyOf(time, (updated) => {
                updated.isActive = false;
                updated.timeInterval.end = new Date().toISOString();
              })
            ).catch((err) => console.warn(err));

            await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"])
              .then(async (aTime) => {
                await DataStore.save(
                  UserCredentials.copyOf(aTime, (updated) => {
                    updated.activeTimeEntry = null;
                  })
                )
                  .then(async () => {
                    //stopTimer();
                    await Auth.updateUserAttributes(user, {
                      "custom:RuningTimeEntry": "null",
                    }).catch((err) => console.warn(err));
                  })
                  .catch((err) => console.warn(err));
              })
              .catch((err) => console.warn(err));
          })
          .catch((err) => console.warn(err));

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
      <Grid item xs={12} md={!started ? 6 : 5}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <WorklistSelect sel={sel} setSel={setSel} />
      </Grid>

      <Grid item xs={4} md={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
          {String("0" + time.hours).slice(-2)}:{String("0" + time.minutes).slice(-2)}:
          {String("0" + time.seconds).slice(-2)}
        </Typography>
        {timerTime && <EditStartTime open={open} setOpen={setOpen} setTime={setTime} timerTime={timerTime} />}
      </Grid>

      {started && (
        <Grid item xs={4} md={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Break
          </Button>
          <BreakPopover id={id} open={openBreak} handleClose={handleClose} anchorEl={anchorEl} />
        </Grid>
      )}

      <Grid item xs={4} md={1} sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={addItem} variant="contained">
          {!started ? "Start" : "Stop"}
        </Button>
      </Grid>
    </Grid>
  );
};
