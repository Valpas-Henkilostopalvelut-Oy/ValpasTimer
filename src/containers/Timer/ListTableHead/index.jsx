import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

const CustomTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Description</TableCell>
        <TableCell align="right">Start</TableCell>
        <TableCell align="right">End</TableCell>
        <TableCell align="right">Date</TableCell>
        <TableCell align="right">Total</TableCell>
        <TableCell align="right">Confirmed</TableCell>
        <TableCell align="right">Sent</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
