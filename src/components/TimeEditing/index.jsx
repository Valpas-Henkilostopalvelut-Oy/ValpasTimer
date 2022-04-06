import { TextField, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../models";
import { timeMaker } from "../../services/time";

const TimeEditing = ({ time, data, type, reload }) => {
  const [value, setValue] = useState("");

  const updateValue = async (val) => {
    try {
      if (type === "start") {
        await DataStore.save(
          TimeEntry.copyOf(data, (update) => {
            update.timeInterval.start = new Date(
              new Date(time).setHours(val.h, val.m, 0)
            ).toISOString();
          })
        );
        reload();
      } else if (type === "end") {
        await DataStore.save(
          TimeEntry.copyOf(data, (update) => {
            update.timeInterval.end = new Date(
              new Date(time).setHours(val.h, val.m, 0)
            ).toISOString();
          })
        );
        reload();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    let isActive = false;

    let d = new Date(time);

    !isActive &&
      setValue(
        `${String("0" + d.getHours()).slice(-2)}:${String(
          "0" + d.getMinutes()
        ).slice(-2)}`
      );

    return () => (isActive = true);
  }, [time]);

  return (
    <Box sx={{ width: 43 }}>
      <TextField
        variant="standard"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={(event) => timeMaker(event, {setValue, time, updateValue})}
      />
    </Box>
  );
};

export default TimeEditing;
