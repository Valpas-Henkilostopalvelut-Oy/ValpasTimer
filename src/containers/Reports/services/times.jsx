import React from "react";
import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { totaldaytime, totalweektime, totaltimeshift, totalbreak } from "./totaltime.jsx";

export const STime = (props) => {
  const { date, ...otherProps } = props;
  let sTime = new Date(date.arr[date.arr.length - 1].timeshift.timeInterval.start);
  let sh = String(sTime.getHours()).padStart(2, "0");
  let sm = String(sTime.getMinutes()).padStart(2, "0");
  return (
    <Typography variant="p" {...otherProps}>
      {sh}:{sm}
    </Typography>
  );
};

export const ETime = (props) => {
  const { date, ...otherProps } = props;
  let eTime = new Date(date.arr[0].timeshift.timeInterval.end);
  let eh = String(eTime.getHours()).padStart(2, "0");
  let em = String(eTime.getMinutes()).padStart(2, "0");
  return (
    <Typography variant="p" {...otherProps}>
      {eh}:{em}
    </Typography>
  );
};

export const Time = (props) => {
  const { time, ...otherProps } = props;
  let value = new Date(time);
  let hours = String(value.getHours()).padStart(2, "0");
  let minutes = String(value.getMinutes()).padStart(2, "0");
  return (
    <Typography variant="p" {...otherProps}>
      {hours}:{minutes}
    </Typography>
  );
};

export const SDate = (props) => {
  const { date, ...otherProps } = props;
  let value = new Date(date);
  let day = String(value.getDate()).padStart(2, "0");
  let month = String(value.getMonth() + 1).padStart(2, "0");
  let year = value.getFullYear();
  return (
    <Typography variant="p" {...otherProps}>
      {day}.{month}.{year}
    </Typography>
  );
};

export const Totalweek = (props) => {
  const { timeList, ...otherProps } = props;
  let total = totalweektime(timeList.arr);
  total = `${total.h}h ${total.min}m`;

  return (
    <Typography variant="p" {...otherProps}>
      {total}
    </Typography>
  );
};

export const Totalday = (props) => {
  const { item, ...otherProps } = props;
  let total = totaldaytime(item.arr);
  total = `${total.h}h ${total.min}m`;

  return (
    <Typography variant="p" {...otherProps}>
      {total}
    </Typography>
  );
};

export const Totaltimeshift = (props) => {
  const { item, ...otherProps } = props;
  let total = totaltimeshift(item);
  total = `${total.h}h ${total.min}m`;

  return (
    <Typography variant="p" {...otherProps}>
      {total}
    </Typography>
  );
};

export const Totalbreak = (props) => {
  const { item, ...otherProps } = props;
  let total = totalbreak(item);
  total = `- ${total.h}h ${total.min}m`;

  return (
    <Typography variant="p" {...otherProps}>
      {total}
    </Typography>
  );
};

STime.propTypes = {
  date: PropTypes.object,
};

ETime.propTypes = {
  date: PropTypes.object,
};

Time.propTypes = {
  time: PropTypes.string,
};
