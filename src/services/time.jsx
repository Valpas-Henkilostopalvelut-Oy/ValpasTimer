import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";

export const timeMaker = (event, time, fix = null) => {
  if (event !== null) {
    var val = event.target.value;
  } else {
    var val = fix;
  }

  const arr = val.split("").filter((t) => t !== ":");

  if (arr.length === 1) {
    let h = String(arr[0]);
    let min = 0;

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 2) {
    let h = String(arr[0] + arr[1]);
    let min = 0;

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 3) {
    let h = String(arr[0]);
    let min = String(arr[1] + arr[2]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 4) {
    let h = String(arr[0] + arr[1]);
    let min = String(arr[2] + arr[3]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    return { h: Number(h), m: Number(min) };
  } else {
    let d = new Date(time);

    return { h: Number(d.getHours()), m: Number(d.getMinutes()) };
  }
};

export const TextToTime = ({ date = new Date(), onChange }) => {
  const [time, setTime] = useState(
    `${String("0" + new Date(date).getHours()).slice(-2)}:${String("0" + new Date(date).getMinutes()).slice(-2)}`
  );
  const [click, setClick] = useState(true);

  return click ? (
    <TextField
      sx={{ width: "40.797px" }}
      autoFocus
      variant="standard"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      onBlur={(e) => {
        if (e.target.value !== "") {
          let val = timeMaker(e, time);
          setTime(`${String("0" + val.h).slice(-2)}:${String("0" + val.m).slice(-2)}`);
          onChange({ h: val.h, min: val.m });
        }
        setClick(false);
      }}
    />
  ) : (
    <Typography onClick={() => setClick(!click)}>{time}</Typography>
  );
};
