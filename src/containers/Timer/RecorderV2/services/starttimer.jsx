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

const startTimer = async ({ description, workplace }) => {
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
  });
};

export const StartTimer = ({ description = "", workplace = "", isStarted = false, setStarted }) => {
  const handleClick = () => {
    !isStarted && startTimer({ description, workplace });
    setStarted(true);
  };
  return (
    <Button onClick={handleClick}>
      <Typography>Start Timer</Typography>
    </Button>
  );
};
