import React from "react";
import { Button } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry } from "../../../../models/index.js";
import { PropTypes } from "prop-types";

const startTimer = async ({ description, workplace, setTimer, work = null }) => {
  await Auth.currentAuthenticatedUser().then(async (user) => {
    await DataStore.save(
      new TimeEntry({
        description: description,
        userId: user.username,
        workspaceId: workplace,
        work: work,
        timeInterval: {
          start: new Date(new Date().setMilliseconds(0)).toISOString(),
        },
        isActive: true,
        isLocked: false,
        isSent: false,
        isConfirmed: false,
        break: [],
        isPaused: false,
      })
    )
      .then(async (time) => {
        await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"])
          .then(async (userCred) => {
            setTimer(time);
            await DataStore.save(
              UserCredentials.copyOf(userCred, (updated) => {
                updated.activeTimeEntry = time.id;
              })
            );
          })
          .catch((err) => console.warn(err));
      })
      .catch((err) => console.warn(err));
  });
};

const stopTimer = async () => {
  await Auth.currentAuthenticatedUser()
    .then(async (user) => {
      let userId = user.attributes["custom:UserCreditails"];

      await DataStore.query(UserCredentials, userId)
        .then(async (userCred) => {
          await DataStore.query(TimeEntry, userCred.activeTimeEntry)
            .then(async (time) => {
              console.log(time);
              await DataStore.save(
                TimeEntry.copyOf(time, (updated) => {
                  updated.isPaused = false;
                  updated.isActive = false;
                  updated.timeInterval.end = updated.isPaused
                    ? updated.pauseStart
                    : new Date(new Date().setMilliseconds(0)).toISOString();
                })
              )
                .then(async () => {
                  await DataStore.save(
                    UserCredentials.copyOf(userCred, (updated) => {
                      updated.activeTimeEntry = null;
                    })
                  );
                })
                .catch((err) => console.warn(err));
            })
            .catch((err) => console.warn(err));
        })
        .catch((err) => console.warn(err));
    })
    .catch((err) => console.warn(err));
};

export const StartTimer = ({
  workitem,
  workitems,
  description = "",
  workplace = "",
  isStarted = false,
  setStarted,
  setTimer,
  setTime,
  lang = {
    start: "Start",
    stop: "Stop",
  },
  setIsPaused,
}) => {
  const handleStart = () => {
    if (!isStarted) {
      let work = workitems && workitems.find((item) => item.id === workitem);
      startTimer({ description, workplace, setTimer: (e) => setTimer(e), work });
      setStarted(true);
    }
  };

  const handleStop = () => {
    if (isStarted) {
      stopTimer();
      setTimer(null);
      setStarted(false);
      setIsPaused(false);
      setTimeout(() => {
        setTime({
          seconds: 0,
          minutes: 0,
          hours: 0,
        });
      }, 1000);
    }
  };

  return !isStarted ? (
    <Button onClick={handleStart} disabled={workplace === ""}>
      {lang.start}
    </Button>
  ) : (
    <Button onClick={handleStop} disabled={workplace === ""} color="error">
      {lang.stop}
    </Button>
  );
};

StartTimer.propTypes = {
  description: PropTypes.string,
  workplace: PropTypes.string,
  isStarted: PropTypes.bool,
  setStarted: PropTypes.func,
  setTimer: PropTypes.func,
  setTime: PropTypes.func,
  lang: PropTypes.object,
};
