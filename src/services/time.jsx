import React, { useState } from "react";
import { InputBase, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export const timeMaker = (event, time) => {
  if (event !== null) {
    var val = event.target.value;
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

    return { h: Number(d.getUTCHours()), m: Number(d.getUTCMinutes()) };
  }
};

export const TextToTime = ({ date = new Date(), onChange, isSent = true }) => {
  const h = new Date(date).getHours();
  let m = new Date(date).getMinutes();

  const [time, setTime] = useState(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);

  return isSent ? (
    <Typography variant="p">{time}</Typography>
  ) : (
    <InputBase
      label="Time"
      value={time}
      disabled={isSent}
      sx={{
        maxWidth: "36px",
      }}
      onChange={(e) => setTime(e.target.value)}
      onBlur={(e) => {
        const { value } = e.target;
        if (value !== "") {
          let val = timeMaker(e, time);
          setTime(`${String(val.h).padStart(2, "0")}:${String(val.m).padStart(2, "0")}`);
          onChange({ h: val.h, min: val.m });
        }
      }}
    />
  );
};

TextToTime.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  isSent: PropTypes.bool,
};
