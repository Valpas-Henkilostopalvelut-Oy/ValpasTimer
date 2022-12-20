import React from "react";
import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export const STime = ({ date }) => {
  let sTime = new Date(date.arr[date.arr.length - 1].timeInterval.start);
  return (
    <Typography variant="p">
      {sTime.getHours()}:{sTime.getMinutes()}
    </Typography>
  );
};

export const ETime = ({ date }) => {
  let eTime = new Date(date.arr[0].timeInterval.end);
  return (
    <Typography variant="p">
      {eTime.getHours()}:{eTime.getMinutes()}
    </Typography>
  );
};

export const Time = ({ time }) => {
  let value = new Date(time);
  return (
    <Typography variant="p">
      {value.getHours()}:{value.getMinutes()}
    </Typography>
  );
};

STime.propTypes = {
  date: PropTypes.object,
};

ETime.propTypes = {
  date: PropTypes.object,
};
