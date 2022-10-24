import React from "react";
import { Typography } from "@mui/material";
import { TextToTime } from "../../../services/time.jsx";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { timeMaker } from "../../../services/time.jsx";

export const STime = ({ date }) => {
  let sTime = new Date(date.arr[0].timeInterval.start);
  return (
    <Typography variant="p">
      {sTime.getHours()}:{sTime.getMinutes()}
    </Typography>
  );
};

export const ETime = ({ date }) => {
  let eTime = new Date(date.arr[date.arr.length - 1].timeInterval.end);
  return (
    <Typography variant="p">
      {eTime.getHours()}:{eTime.getMinutes()}
    </Typography>
  );
};

const updateSTime = async (data, time) => {
  let sTime = new Date(data.timeInterval.start).setHours(time.h, time.min, 0, 0);
  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.start = new Date(sTime).toISOString();
    })
  ).catch((e) => console.warn(e));
};

export const EditSTime = ({ date }) => {
  return <TextToTime date={date.timeInterval.start} onChange={(t) => updateSTime(date, t)} />;
};

const updateETime = async (data, time) => {
  let eTime = new Date(data.timeInterval.end).setHours(time.h, time.min, 0, 0);
  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.end = new Date(eTime).toISOString();
    })
  ).catch((e) => console.warn(e));
};

export const EditETime = ({ date }) => {
  return <TextToTime date={date.timeInterval.end} onChange={(t) => updateETime(date, t)} />;
};

export const TotalTime = ({ date }) => {
  let start = new Date(date.timeInterval.start);
  let end = new Date(date.timeInterval.end);
  let total = new Date(Date.parse(end) - Date.parse(start));
  let isSent = date.isSent;

  return isSent ? (<Typography>err</Typography>) : (<TextToTime date={total} onChange={(e) => console.log(e)} />);
};
