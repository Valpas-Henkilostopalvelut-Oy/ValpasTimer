import React, { Fragment } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Details } from "../Details";

export const Row = ({ data, loadTimeList }) => {
  let date = { h: 0, min: 0 };
  for (let i = 0; i < data.arr.length; i++) {
    let arr = data.arr[i];

    for (let ii = 0; ii < arr.arr.length; ii++) {
      const timeL = arr.arr[ii];
      let start = new Date(timeL.timeInterval.start).setMilliseconds(0);
      let end = new Date(timeL.timeInterval.end).setMilliseconds(0);

      let total = new Date(Math.abs(end - start));

      date = {
        h: date.h + total.getUTCHours(),
        min: date.min + total.getUTCMinutes(),
      };

      if (date.min > 60) {
        date.h += Math.floor(date.min / 60);
        date.min = date.min % 60;
      }
    }
  }

  return (
    <Fragment>
      <TableRow>
        <TableCell >Week {data.week}</TableCell>
        <TableCell colSpan={4} align="right">
          {date.h}h {date.min}min
        </TableCell>
      </TableRow>
      {data.arr.map((byday, key) => (
        <Details data={byday} key={key} index={key} loadTimeList={loadTimeList} />
      ))}
    </Fragment>
  );
};
