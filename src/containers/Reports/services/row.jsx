import React from "react";
import { Table, Typography, TableBody, TableCell, TableRow, Box } from "@mui/material";
import { DSTime, DETime } from "./times.jsx";

const TotalTime = ({ date }) => {
  let start = new Date(date.timeInterval.start);
  let end = new Date(date.timeInterval.end);
  let total = Date.parse(end) - Date.parse(start);

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
    <Box>
      <Table size="small" aria-label="purchases">
        <TableBody>
          {date.arr.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.description ? row.description : "No description"}</TableCell>
              <TableCell align="right">
                <DSTime date={row} />
              </TableCell>
              <TableCell align="right">
                <DETime date={row} />
              </TableCell>
              <TableCell align="right">
                <TotalTime date={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
