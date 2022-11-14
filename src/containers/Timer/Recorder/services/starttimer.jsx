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
            await DataStore.save(
              UserCredentials.copyOf(userCred, (updated) => {
                updated.activeTimeEntry = time.id;
              })
            )
              .then(async () => {
                setTimer(time);
                await Auth.updateUserAttributes(user, {
                  "custom:RuningTimeEntry": time.id,
                }).catch((err) => console.warn(err));
              })
              .catch((err) => console.warn(err));
          })
          .catch((err) => console.warn(err));
      })
      .catch((err) => console.warn(err));
  });
};

const stopTimer = async () => {
  await Auth.currentAuthenticatedUser()
    .then(async (user) => {
      let timeId = user.attributes["custom:RuningTimeEntry"];

      await DataStore.query(TimeEntry, timeId)
        .then(async (time) => {
          await DataStore.save(
            TimeEntry.copyOf(time, (updated) => {
              updated.isActive = false;
              updated.timeInterval.end = new Date(new Date().setMilliseconds(0)).toISOString();
            })
          )
            .then(async () => {
              await Auth.updateUserAttributes(user, {
                "custom:RuningTimeEntry": "null",
              }).catch((err) => console.warn(err));
            })
            .catch((err) => console.warn(err));
        })
        .catch((err) => console.warn(err));
    })
    .catch((err) => console.warn(err));
};

export const StartTimer = ({ description = "", workplace = "", isStarted = false, setStarted, setTimer }) => {
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
    }
  };

  return !isStarted ? (
    <Button onClick={handleStart} disabled={workplace === ""}>
      Start
    </Button>
  ) : (
    <Button onClick={handleStop} disabled={workplace === ""}>
      Stop
    </Button>
  );
};
