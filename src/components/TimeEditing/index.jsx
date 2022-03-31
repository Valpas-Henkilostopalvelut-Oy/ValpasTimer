import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const TimeEditing = ({ time, data, type }) => {
  const [value, setValue] = useState("");
  const maker = (customTime, val) => {
    const arr = customTime.target.value.split("").filter((t) => t !== ":");

    if (arr.length === 1) {
      setValue(`0${arr[0]}:00`);
    } else if (arr.length === 2) {
      let h = String(arr[0] + arr[1]);

      setValue(`${h.slice(-2)}:00`);
    } else if (arr.length === 3) {
      let h = String(arr[0]);
      let min = String(arr[1] + arr[2]);

      if (Number(min) > 60) {
        Number(h++);
        min = Number(min - 60);
      }

      setValue(`${String("0" + h).slice(-2)}:${String("0" + min).slice(-2)}`);
    } else if (arr.length === 4) {
      let h = String(arr[0] + arr[1]);
      let min = String(arr[2] + arr[3]);

      if (Number(min) > 60) {
        Number(h++);
        min = Number(min - 60);
      }

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
  }, []);

  return (
    <TextField
      variant="standard"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onMouseLeave={maker}
    />
  );
};

export default TimeEditing;
