import React, { useEffect, useState, Fragment } from "react";
import { TextField, Button, Grid, Switch, Typography } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry } from "../../../models";
import TimeEditing from "../../../components/TimeEditing";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import WorkspaceSelect from "../../../components/WorkSpaceSelect";

const Manual = ({ reload, description, selectedOption }) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const total = new Date(Math.abs(end - start));

  const addNewTime = async () => {
    if (Date.parse(start) !== Date.parse(end)) {
      const currentUser = await Auth.currentAuthenticatedUser();

      try {
        await DataStore.save(
          new TimeEntry({
            description: description,
            userId: currentUser.username,
            workspaceId: selectedOption.id,
            timeInterval: {
              duration: "",
              start: start.toISOString(),
              end: end.toISOString(),
            },
            isActive: false,
            isLocked: false,
            isSent: false,
            isConfirmed: false,
            billable: false,
          })
        );

        reload();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <Fragment>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Basic example"
            value={start}
            onChange={(newValue) => {
              setStart(new Date(newValue));
              setEnd(new Date(newValue));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs>
        Start:{" "}
        <TimeEditing
          time={start}
          onChange={(val) => setStart(new Date(start.setHours(val.h, val.m, 0)))}
          isManual={true}
        />
      </Grid>

      <Grid item xs>
        End:{" "}
        <TimeEditing time={end} onChange={(val) => setEnd(new Date(end.setHours(val.h, val.m, 0)))} isManual={true} />
      </Grid>

      <Grid item xs>
        <Typography variant="h6">
          {String("0" + total.getUTCHours()).slice(-2)}:{String("0" + total.getUTCMinutes()).slice(-2)}:
          {String("0" + total.getUTCMilliseconds()).slice(-2)}
        </Typography>
      </Grid>

      <Grid item xs>
        <Button onClick={addNewTime}>Add</Button>
      </Grid>
    </Fragment>
  );
};

const Timer = ({ description, selectedOption, reload }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let isActive = false;

    const checkActiveTime = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user.attributes["custom:RuningTimeEntry"] !== "null") {
          const ongoingTime = await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"]);

          const timeDiff = new Date(Date.parse(new Date()) - Date.parse(ongoingTime.timeInterval.start));
          setTime({
            seconds: timeDiff.getUTCSeconds(),
            minutes: timeDiff.getUTCMinutes(),
            hours: timeDiff.getUTCHours(),
          });

          setStarted(true);
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
            workspaceId: selectedOption.id,
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

  //timer form fields and logic for adding new time
  return (
    <Fragment>
      <Grid item md>
        <Typography variant="h6">
          {String("0" + time.hours).slice(-2)}:{String("0" + time.minutes).slice(-2)}:
          {String("0" + time.seconds).slice(-2)}
        </Typography>
      </Grid>

      <Grid item md>
        <Button onClick={addItem} variant="contained">
          {!started ? "Start" : "Stop"}
        </Button>
      </Grid>
    </Fragment>
  );
};

const Recorder = ({ loadTimeList }) => {
  const [manual, setManual] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [description, setDescription] = useState("");
  const handleChange = (event) => setDescription(event.target.value);

  return (
    <Grid container spacing={2} alignItems="center" direction="row">
      <Grid item container md={manual ? 4 : 8} lg={manual ? 6 : 9} spacing={2}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Description"
            placeholder="Description"
            onChange={handleChange}
            value={description}
          />
        </Grid>
        <Grid item xs={2}>
          <WorkspaceSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </Grid>
      </Grid>

      <Grid
        item
        container
        md={manual ? 8 : 4}
        lg={manual ? 6 : 3}
        alignItems="center"
        direction="row"
        justifyContent="space-around"
        spacing={2}
      >
        {!manual ? (
          <Timer reload={loadTimeList} description={description} selectedOption={selectedOption} />
        ) : (
          <Manual reload={loadTimeList} description={description} selectedOption={selectedOption} />
        )}
        <Grid item md>
          <Switch onChange={() => setManual(!manual)} value={manual} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Recorder;
