import React from "react";
import { TableRow, TableHead, TableCell, Checkbox } from "@mui/material";

const ListHead = (props) => {
  const { onSelectAllClick, numSelected, rowCount } = props;

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
