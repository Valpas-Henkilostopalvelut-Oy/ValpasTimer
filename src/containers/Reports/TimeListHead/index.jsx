import React from "react";
import { TableRow, TableHead, TableCell } from "@mui/material";

const ListHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell>Date</TableCell>
        <TableCell align="right">Description</TableCell>
        <TableCell align="right">Start time</TableCell>
        <TableCell align="right">End time</TableCell>
        <TableCell align="right">Total time</TableCell>
        <TableCell align="right">Confirmed</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ListHead;
