import React from "react";
import { Table, Typography, TableBody, TableCell, TableRow, Box } from "@mui/material";
import { Time } from "./times.jsx";

export const Breakslist = ({ date }) => {
  const breaks = date.break;

  console.log(breaks);
  return (
    breaks &&
    breaks.map((item, i) => (
      <TableRow key={i}>
        <TableCell>
          <Time time={item.start} />
        </TableCell>
        <TableCell>
          <Time time={item.end} />
        </TableCell>
        <TableCell>
          <Typography variant="p">{item.duration}</Typography>
        </TableCell>
      </TableRow>
    ))
  );
};
