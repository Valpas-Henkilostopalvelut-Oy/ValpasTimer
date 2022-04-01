import { TextField, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../models";

const TimeEditing = ({ time, data, type, reload }) => {
  const [value, setValue] = useState("");
  const maker = (customTime, val) => {
    const arr = customTime.target.value.split("").filter((t) => t !== ":");

    if (arr.length === 1) {
      let h = String(arr[0]);
      let min = "00";

      updateValue({ h: Number(h), m: Number(min) });

      setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
    } else if (arr.length === 2) {
      let h = String(arr[0] + arr[1]);
      let min = "00";

      updateValue({ h: Number(h), m: Number(min) });

      setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
    } else if (arr.length === 3) {
      let h = String(arr[0]);
      let min = String(arr[1] + arr[2]);

      if (Number(min) > 60) {
        Number(h++);
        min = Number(min - 60);
      }

      updateValue({ h: Number(h), m: Number(min) });

      setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
    } else if (arr.length === 4) {
      let h = String(arr[0] + arr[1]);
      let min = String(arr[2] + arr[3]);

      if (Number(min) > 60) {
        Number(h++);
        min = Number(min - 60);
      }

      updateValue({ h: Number(h), m: Number(min) });

      setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
    } else {
      let d = new Date(time);
      setValue(
        `${String("0" + d.getHours()).slice(-2)}:${String(
          "0" + d.getMinutes()
        ).slice(-2)}`
      );
    }
  };

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
        reload()
      } else if (type === "end") {
        await DataStore.save(
          TimeEntry.copyOf(data, (update) => {
            update.timeInterval.end = new Date(
              new Date(time).setHours(val.h, val.m, 0)
            ).toISOString();
          })
        );
        reload()
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
        onBlur={maker}
      />
    </Box>
  );
};

export default TimeEditing;
