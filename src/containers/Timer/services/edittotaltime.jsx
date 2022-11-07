import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";

const time = (e) => {
  let t = e.target.value;
  let arr = t.split("").filter((t) => t !== ":");
  if (arr.length === 0) {
    return {
      h: 0,
      min: 0,
      sec: 0,
    };
  } else if (arr.length === 1) {
    return {
      h: 0,
      min: Number(arr[0]),
      sec: 0,
    };
  } else if (arr.length === 2) {
    let h = 0;
    let min = arr[0] + arr[1];

    if (min > 59) {
      h = Math.floor(min / 60);
      min = min % 60;
    }

    return {
      h: Number(h),
      min: Number(min),
      sec: 0,
    };
  } else if (arr.length === 3) {
    let h = arr[0];
    let min = arr[1] + arr[2];

    if (min > 59) {
      h = Math.floor(min / 60);
      min = min % 60;
    }

    return {
      h: Number(h),
      min: Number(min),
      sec: 0,
    };
  } else if (arr.length === 4) {
    let h = arr[0] + arr[1];
    let min = arr[2] + arr[3];

    if (min > 59) {
      h = Math.floor(min / 60);
      min = min % 60;
    }

    return {
      h: Number(h),
      min: Number(min),
      sec: 0,
    };
  } else if (arr.length === 5) {
    let h = arr[0] + arr[1] + arr[2];
    let min = arr[4] + arr[4];

    if (min > 59) {
      h = Math.floor(min / 60);
      min = min % 60;
    }

    return {
      h: Number(h),
      min: Number(min),
      sec: 0,
    };
  } else {
    return {
      h: 0,
      min: 0,
      sec: 0,
    };
  }
};

const calculateEndtime = async (start, total, data) => {
  let s = new Date(start);
  let d = s.getDate();
  let h = s.getHours() + total.h;
  let min = s.getMinutes() + total.min;
  let sec = s.getSeconds() + total.sec;

  let end = new Date(s.getFullYear(), s.getMonth(), d, h, min, sec);

  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.end = end.toISOString();
    })
  ).catch((e) => console.warn(e));
};

export const TotalTime = ({ date }) => {
  let start = new Date(date.timeInterval.start);
  let end = new Date(date.timeInterval.end);
  let total = Date.parse(end) - Date.parse(start);

  let hours = Math.floor(total / (1000 * 60 * 60));
  let minutes = Math.floor((total / (1000 * 60)) % 60);
  let seconds = Math.floor((total / 1000) % 60);

  const [totalTime, setTotalTime] = useState(
    `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${
      seconds > 9 ? seconds : "0" + seconds
    }`
  );

  const [click, setClick] = React.useState(false);

  return !click ? (
    <Typography variant="p" onClick={() => setClick(true)}>
      {totalTime}
    </Typography>
  ) : (
    <TextField
      value={totalTime}
      autoFocus
      sx={{ width: "74.67px" }}
      variant="standard"
      onChange={(e) => {
        setTotalTime(e.target.value);
      }}
      onBlur={(e) => {
        let t = time(e);
        setTotalTime(
          `${t.h > 9 ? t.h : "0" + t.h}:${t.min > 9 ? t.min : "0" + t.min}:${t.sec > 9 ? t.sec : "0" + t.sec}`
        );

        calculateEndtime(start, t, date);
        setClick(false);
      }}
    />
  );
};
