import React from "react";
import { Typography } from "@mui/material";
import { TextToTime } from "../../../services/time.jsx";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";

export const Time = ({ time }) => {
  let t = new Date(time);
  let hours = String(t.getHours()).padStart(2, "0");
  let minutes = String(t.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
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

Time.propTypes = {
  time: PropTypes.string,
};

EditSTime.propTypes = {
  date: PropTypes.object,
};

EditETime.propTypes = {
  date: PropTypes.object,
};
