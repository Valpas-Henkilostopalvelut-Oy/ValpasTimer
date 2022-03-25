import React from "react";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";

const CustomTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell>Description</TableCell>
        <TableCell align="right">Start</TableCell>
        <TableCell align="right">End</TableCell>
        <TableCell align="right">Date</TableCell>
        <TableCell align="right">Total</TableCell>
        <TableCell align="right">Sent</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
