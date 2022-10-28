import React, { useEffect, useState, Fragment } from "react";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry, Break, AllWorkSpaces } from "../../../../models";

import { TextToTime } from "../../../../services/time.jsx";
import { Typography } from "@mui/material";
import { EditStartTime } from "./editstartedtime";

export const Timer = ({
  description,
  workplace,
  setWorkplace,
  isStarted = false,
  setStarted,
  setTimerTime,
  timerTime = null,
}) => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    const checkActive = async () => {
      await Auth.currentAuthenticatedUser().then(async (user) => {
        if (user.attributes["custom:RuningTimeEntry"] !== "null") {
          await DataStore.query(TimeEntry, user.attributes["custom:RuningTimeEntry"])
            .then(async (res) => {
              if (res.isActive) {
                setStarted(true);
                setTimerTime(res);
                //setWorkplace(res.workspaceId);
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

    if (isStarted && isCanceled) {
      advanceTime();
    } else {
      advanceTimeStop();
    }

    return () => (isCanceled = true);
  }, [time, isStarted]);

  return (
    <Fragment>
      <Typography variant="h6" onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        {time.hours < 10 ? "0" + time.hours : time.hours}:{time.minutes < 10 ? "0" + time.minutes : time.minutes}:
        {time.seconds < 10 ? "0" + time.seconds : time.seconds}
      </Typography>
      {timerTime && <EditStartTime open={open} setOpen={setOpen} timerTime={timerTime} />}
    </Fragment>
  );
};
