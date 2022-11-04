import React, { useEffect, useState, Fragment } from "react";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry, Break, AllWorkSpaces } from "../../../../models";

import { TextToTime } from "../../../../services/time.jsx";
import { Typography, Grid } from "@mui/material";
import { EditStartTime } from "./editstartedtime";
import { EditDescriptionTimer } from "./editdescription";
import { EditWorkplaceTimer } from "./editworkplace";
import { StartTimer } from "./starttimer";

export const Timer = ({ description, sel, setDescription, setSel, works, isStarted, setStarted }) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const [timerTime, setTimer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    const checkActive = async () => {
      await Auth.currentAuthenticatedUser().then(async (user) => {
        if (user.attributes["custom:RuningTimeEntry"] !== "null") {
          await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"])
            .then(async (res) => {
              setStarted(true);
              if (res.isActive) {
                //math time
                let timeDiff = Math.abs(new Date() - new Date(res.timeInterval.start));
                const hours = Math.floor(timeDiff / 1000 / 60 / 60);
                const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);

                setTime({
                  seconds: seconds,
                  minutes: minutes,
                  hours: hours,
                });
                setStarted(true);
                setTimer(res);
                setSel(res.workspaceId);
                setDescription(res.description);
              } else {
                await Auth.updateUserAttributes(user, {
                  "custom:RuningTimeEntry": "null",
                }).catch((err) => console.warn(err));
              }
            })
            .catch(async (e) => {
              await Auth.updateUserAttributes(user, {
                "custom:RuningTimeEntry": "null",
              }).catch((err) => console.warn(err));
              console.warn(e);
            });
        }
      });
    };

    if (isActive) {
      checkActive();
    }

    return () => (isActive = false);
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

    const advanceTimeStop = () => {
      setTime({
        seconds: 0,
        minutes: 0,
        hours: 0,
      });
    };

    if (isStarted) {
      advanceTime();
    } else {
      advanceTimeStop();
    }

    return () => (isCanceled = true);
  }, [isStarted, time]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <EditDescriptionTimer
          description={description}
          setDescription={setDescription}
          data={timerTime}
          isStarted={isStarted}
        />
      </Grid>
      <Grid item xs={4}>
        <EditWorkplaceTimer sel={sel} setSel={setSel} works={works} data={timerTime} isStarted={isStarted}/>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h5"
          align="center"
          onClick={() => {
            isStarted && setOpen(true);
          }}
        >
          {time.hours < 10 ? "0" + time.hours : time.hours}:{time.minutes < 10 ? "0" + time.minutes : time.minutes}:
          {time.seconds < 10 ? "0" + time.seconds : time.seconds}
        </Typography>
        {timerTime && isStarted && <EditStartTime open={open} setOpen={setOpen} timerTime={timerTime} />}
      </Grid>
      <Grid item xs={2}>
        <StartTimer
          description={description}
          workplace={sel}
          isStarted={isStarted}
          setStarted={setStarted}
          setTimer={setTimer}
          timer={timerTime}
        />
      </Grid>
    </Grid>
  );
};