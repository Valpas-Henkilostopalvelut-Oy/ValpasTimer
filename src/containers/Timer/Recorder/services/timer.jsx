import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../../models";
import { Typography, Grid } from "@mui/material";
import { EditStartTime } from "./editstartedtime";
import { EditDescriptionTimer } from "./editdescription";
import { EditWorkplaceTimer } from "./editworkplace";
import { StartTimer } from "./starttimer";
import { PropTypes } from "prop-types";

export const Timer = ({ description, sel, setDescription, setSel, works, isStarted, setStarted, lang }) => {
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
        let userId = user.attributes["custom:UserCreditails"];

        await DataStore.query(UserCredentials, userId).then(async (userCred) => {
          await DataStore.query(TimeEntry, userCred.activeTimeEntry)
            .then(async (res) => {
              if (res.isActive) {
                setTimer(res);
                setSel(res.workspaceId);
                setDescription(res.description);

                var nTime = new Date();
                var sTime = new Date(res.timeInterval.start);

                var diff = nTime.getTime() - sTime.getTime();

                var seconds = Math.floor((diff / 1000) % 60);
                var minutes = Math.floor((diff / (1000 * 60)) % 60);
                var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

                setStarted(true);
                setTime({
                  seconds: seconds,
                  minutes: minutes,
                  hours: hours,
                });
              } else {
                await DataStore.save(
                  UserCredentials.copyOf(userCred, (updated) => {
                    updated.activeTimeEntry = null;
                  })
                ).catch((err) => console.warn(err));
              }
            })
            .catch(async (e) => {
              await DataStore.save(
                UserCredentials.copyOf(userCred, (updated) => {
                  updated.activeTimeEntry = null;
                })
              ).catch((err) => console.warn(err));
              console.warn(e);
            });
        });
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

        setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };

    isStarted && !isCanceled && advanceTime();

    return () => (isCanceled = true);
  }, [isStarted, time]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4}>
        <EditDescriptionTimer
          description={description}
          setDescription={setDescription}
          data={timerTime}
          isStarted={isStarted}
          lang={lang}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EditWorkplaceTimer
          sel={sel}
          setSel={setSel}
          works={works}
          data={timerTime}
          isStarted={isStarted}
          lang={lang}
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography
          variant="h5"
          align="center"
          onClick={() => {
            isStarted && setOpen(true);
          }}
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
        {timerTime && isStarted && <EditStartTime open={open} setOpen={setOpen} timerTime={timerTime} lang={lang} />}
      </Grid>
      <Grid item xs={6} md={2}>
        <StartTimer
          description={description}
          workplace={sel}
          isStarted={isStarted}
          setStarted={setStarted}
          setTimer={setTimer}
          setTime={setTime}
          lang={lang}
        />
      </Grid>
    </Grid>
  );
};

Timer.propTypes = {
  description: PropTypes.string,
  sel: PropTypes.string,
  setDescription: PropTypes.func,
  setSel: PropTypes.func,
  works: PropTypes.array,
  isStarted: PropTypes.bool,
  setStarted: PropTypes.func,
  lang: PropTypes.object,
};
