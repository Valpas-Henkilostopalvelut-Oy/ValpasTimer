import React from "react";
import { Table, Typography, TableBody, TableCell, TableRow, Box } from "@mui/material";
import { Time } from "./times.jsx";

const durationF = (start, end) => {
  let s = new Date(start);
  let e = new Date(end);
  let total = Date.parse(e) - Date.parse(s);

  let hours = Math.floor(total / (1000 * 60 * 60));
  let minutes = Math.floor((total / (1000 * 60)) % 60);
  let seconds = Math.floor((total / 1000) % 60);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
  };
};

export const Breakslist = ({ date }) => {
  const breaks = date.break;

  return (
    breaks &&
    breaks.map((item, i) => {
      const duration = durationF(item.start, item.end);
      return (
        <TableRow key={i}>
          <TableCell />
          <TableCell align="right">
            <Time time={item.start} /> - <Time time={item.end} />
          </TableCell>
          <TableCell align="right">
            <Typography variant="p">
              {duration.hours}:{duration.minutes}
            </Typography>
          </TableCell>
        </TableRow>
      );
    })
  );
};
