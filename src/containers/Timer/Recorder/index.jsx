import React, { useEffect, useState } from "react";
import "./timeRecorder.css";
import { TextField, Button, Box, Grid } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry } from "../../../models";

const Recorder = ({ loadTimeList, selectedOption }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [started, setStarted] = useState(false);

  const [description, setDescription] = useState("");
  const handleChange = (event) => setDescription(event.target.value);

  useEffect(async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user.attributes["custom:RuningTimeEntry"] !== "null") {
      const ongoingTime = await DataStore.query(
        TimeEntry,
        user.attributes["custom:RuningTimeEntry"]
      );

      const timeDiff = new Date(
        Date.parse(new Date()) - Date.parse(ongoingTime.timeInterval.start)
      );
      setTime({
        seconds: timeDiff.getUTCSeconds(),
        minutes: timeDiff.getUTCMinutes(),
        hours: timeDiff.getUTCHours(),
      });

      setStarted(true);
    }
  }, []);

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
              end: new Date().toISOString(),
              start: new Date().toISOString(),
            },
            isActive: true,
            isLocked: false,
            billable: true,
          })
        );

        const original = await DataStore.query(
          UserCredentials,
          user.attributes["custom:UserCreditails"]
        );

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
        const oldActiveTime = await DataStore.query(
          TimeEntry,
          user.attributes["custom:RuningTimeEntry"]
        );

        await DataStore.save(
          TimeEntry.copyOf(oldActiveTime, (updated) => {
            updated.isActive = false;
            updated.timeInterval.end = new Date().toISOString();
          })
        );

        const original = await DataStore.query(
          UserCredentials,
          user.attributes["custom:UserCreditails"]
        );

        await DataStore.save(
          UserCredentials.copyOf(original, (updated) => {
            updated.activeTimeEntry = "null";
          })
        );

        await Auth.updateUserAttributes(user, {
          "custom:RuningTimeEntry": "null",
        });

        loadTimeList();
      };

      if (user.attributes["custom:RuningTimeEntry"] === "null") {
        startTimeEntry();
      } else {
        endTimeEntry();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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

        setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    started && advanceTime();
  }, [time, started]);

  return (
    <Box
      component="form"
      sx={{
        maxWidth: "100%",
        marginBottom: "10px",
        marginTop: "10px",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item md={10}>
          <TextField
            TextField
            fullWidth
            label="fullWidth"
            id="fullWidth"
            placeholder="Description"
            onChange={handleChange}
            value={description}
          />
        </Grid>

        <Grid item md={1}>
          {String("0" + time.hours).slice(-2)}:
          {String("0" + time.minutes).slice(-2)}:
          {String("0" + time.seconds).slice(-2)}
        </Grid>

        <Grid item md={1}>
          <Button onClick={addItem} variant="contained">
            {!started ? "Start" : "Stop"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recorder;
