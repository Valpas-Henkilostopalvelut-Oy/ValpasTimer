import React from "react";
import { Button } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry } from "../../../../models";

const startTimer = async ({ description, workplace, setTimer }) => {
  await Auth.currentAuthenticatedUser().then(async (user) => {
    await DataStore.save(
      new TimeEntry({
        breaks: [],
        description: description,
        userId: user.username,
        workspaceId: workplace,
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
              await DataStore.save(
                TimeEntry.copyOf(time, (updated) => {
                  updated.isActive = false;
                  updated.timeInterval.end = new Date(new Date().setMilliseconds(0)).toISOString();
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
}) => {
  const handleStart = () => {
    if (!isStarted) {
      startTimer({ description, workplace, setTimer: (e) => setTimer(e) });
      setStarted(true);
    }
  };

  const handleStop = () => {
    if (isStarted) {
      stopTimer();
      setTimer(null);
      setStarted(false);
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
    <Button onClick={handleStop} disabled={workplace === ""}>
      {lang.stop}
    </Button>
  );
};
