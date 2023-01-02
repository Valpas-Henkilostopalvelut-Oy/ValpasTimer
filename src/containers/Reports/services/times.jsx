import React from "react";
import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export const STime = ({ date }) => {
  let sTime = new Date(date.arr[date.arr.length - 1].timeInterval.start);
  let sh = String(sTime.getHours()).padStart(2, "0");
  let sm = String(sTime.getMinutes()).padStart(2, "0");
  return (
    <Typography variant="p">
      {sh}:{sm}
    </Typography>
  );
};

export const ETime = ({ date }) => {
  let eTime = new Date(date.arr[0].timeInterval.end);
  let eh = String(eTime.getHours()).padStart(2, "0");
  let em = String(eTime.getMinutes()).padStart(2, "0");
  return (
    <Typography variant="p">
      {eh}:{em}
    </Typography>
  );
};

export const Time = ({ time }) => {
  let value = new Date(time);
  let hours = String(value.getHours()).padStart(2, "0");
  let minutes = String(value.getMinutes()).padStart(2, "0");
  return (
    <Typography variant="p">
      {hours}:{minutes}
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
