import React from "react";
import { Typography } from "@mui/material";
import { TextToTime } from "../../../services/time.jsx";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";

export const STime = ({ date }) => {
  let sTime = new Date(date.arr[date.arr.length - 1].timeInterval.start);
  return (
    <Typography variant="p">
      {sTime.getHours() > 9 ? sTime.getHours() : "0" + sTime.getHours()}:
      {sTime.getMinutes() > 9 ? sTime.getMinutes() : "0" + sTime.getMinutes()}
    </Typography>
  );
};

export const ETime = ({ date }) => {
  let eTime = new Date(date.arr[0].timeInterval.end);
  return (
    <Typography variant="p">
      {eTime.getHours() > 9 ? eTime.getHours() : "0" + eTime.getHours()}:
      {eTime.getMinutes() > 9 ? eTime.getMinutes() : "0" + eTime.getMinutes()}
    </Typography>
  );
};

const updateSTime = async (data, time) => {
  let sTime = new Date(data.timeInterval.start).setHours(time.h, time.min, 0, 0);
  let eTime = new Date(sTime).setHours(time.h + 8, time.min, 0, 0);

  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.start = new Date(sTime).toISOString();
    })
  ).catch((e) => console.warn(e));
};

export const EditSTime = ({ date }) => {
  return (
    <TextToTime date={new Date(date.timeInterval.start)} onChange={(t) => updateSTime(date, t)} isSent={date.isSent} />
  );
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
  return (
    <TextToTime date={new Date(date.timeInterval.end)} onChange={(t) => updateETime(date, t)} isSent={date.isSent} />
  );
};

STime.propTypes = {
  date: PropTypes.object,
};

ETime.propTypes = {
  date: PropTypes.object,
};

EditSTime.propTypes = {
  date: PropTypes.object,
};

EditETime.propTypes = {
  date: PropTypes.object,
};
