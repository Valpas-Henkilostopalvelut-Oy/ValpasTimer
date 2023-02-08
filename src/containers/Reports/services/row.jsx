import React, { Fragment } from "react";
import { Table, Typography, TableBody, TableCell, TableRow } from "@mui/material";
import { Time } from "./times.jsx";
import { PropTypes } from "prop-types";
import { Breakslist } from "./breaks.jsx";
import { totalrowtime } from "./totaltime.jsx";

const TotalTime = ({ date }) => {
  let time = totalrowtime(date);
  let h = String(time.h).padStart(2, "0");
  let m = String(time.min).padStart(2, "0");

  return (
    <Typography variant="p">
      {h}:{m}
    </Typography>
  );
};

export const Detailsrow = ({ date }) => {
  return (
    <Table size="small" aria-label="purchases">
      <TableBody>
        {date.arr
          .sort((a, b) => new Date(a.timeInterval.start) - new Date(b.timeInterval.start))
          .map((row) => (
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

Detailsrow.propTypes = {
  date: PropTypes.object.isRequired,
};

TotalTime.propTypes = {
  date: PropTypes.object.isRequired,
};
