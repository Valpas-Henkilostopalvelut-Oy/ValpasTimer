import React, { Fragment } from "react";
import { Table, Typography, TableBody, TableCell, TableRow, Box } from "@mui/material";
import { Time } from "./times.jsx";
import { PropTypes } from "prop-types";
import { Breakslist } from "./breaks.jsx";

const TotalTime = ({ date }) => {
  let start = new Date(date.timeInterval.start);
  let end = new Date(date.timeInterval.end);
  let breaks = 0;

  let breaksArr = date.break;

  breaksArr &&
    breaksArr.forEach((element) => {
      breaks += Date.parse(element.end) - Date.parse(element.start);
    });

  let total = Date.parse(end) - Date.parse(start) - breaks;

  let hours = Math.floor(total / (1000 * 60 * 60));
  let minutes = Math.floor((total / (1000 * 60)) % 60);
  let seconds = Math.floor((total / 1000) % 60);

  return (
    <Typography variant="p">
      {hours > 0 ? hours + "h " : ""}
      {minutes > 0 ? minutes + "m " : ""}
      {seconds > 0 ? seconds + "s " : ""}
    </Typography>
  );
};

export const Detailsrow = ({ date }) => {
  return (
    <Table size="small" aria-label="purchases">
      <TableBody>
        {date.arr.map((row) => (
          <Fragment key={row.id}>
            <TableRow key={row.id}>
              <TableCell>{row.description ? row.description : "No description"}</TableCell>
              <TableCell align="right">
                <Time time={row.timeInterval.start} /> - <Time time={row.timeInterval.end} />
              </TableCell>
              <TableCell align="right">
                <TotalTime date={row} />
              </TableCell>
            </TableRow>
            <Breakslist date={row} />
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

TotalTime.propTypes = {
  date: PropTypes.object,
};

Detailsrow.propTypes = {
  date: PropTypes.object,
};
