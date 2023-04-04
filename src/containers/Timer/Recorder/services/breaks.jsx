import React, { useState, useEffect } from "react";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry, UserCredentials, Breakreason, Break } from "../../../../models/index.js";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const pauseTime = async (data, setTimer) => {
  const time = new Date().toISOString();

  const newData = TimeEntry.copyOf(data, (updated) => {
    updated.pauseStart = time;
    updated.isPaused = true;
  });

  await DataStore.save(newData)
    .then((newData) => {
      setTimer(newData);
    })
    .catch((e) => console.warn(e));
};

const continueTime = async (data) => {
  if (data.isPaused) {
    // Push a new break to the break array only if the time entry is paused
    await DataStore.save(
      TimeEntry.copyOf(data, (updated) => {
        updated.isPaused = false;
        updated.break.push({
          start: updated.pauseStart,
          end: new Date().toISOString(),
          id: Date.now().toString(),
          reason: Breakreason.LUNCH_L,
        });
      })
    );
  } else {
    // Otherwise, just save the data without pushing a new break
    await DataStore.save(
      TimeEntry.copyOf(data, (updated) => {
        updated.isPaused = false;
      })
    );
  }
};

export const Timerbreak = (props) => {
  const { timerTime, isEmpty, disabled = true, setTimer, isPaused = false, setIsPaused } = props;
  const onPause = async () => {
    await pauseTime(timerTime, setTimer);
    setIsPaused(true);
  };

  const onContinue = async () => {
    await continueTime(timerTime);
    setIsPaused(false);
  };

  return !isPaused ? (
    <Button variant="text" color="primary" onClick={onPause} disabled={!isEmpty || disabled}>
      Tauko
    </Button>
  ) : (
    <Button variant="text" color="primary" onClick={onContinue} disabled={!isEmpty || disabled}>
      Jatka
    </Button>
  );
};
