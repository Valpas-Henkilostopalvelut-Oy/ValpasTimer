import React, { useState } from "react";
import {
  Checkbox,
  TableCell,
  IconButton,
  TableRow,
  TableBody,
  Typography,
  Table,
  TableHead,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const InList = ({ data, selected, setSelected }) => {
  const [open, setOpen] = React.useState(false);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <Table size="small" aria-label="purchases">
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
      <TableBody>
        {data.arr.map((row, index) => {
          let start = new Date(row.arr[row.arr.length - 1].timeInterval.start);
          let end = new Date(row.arr[0].timeInterval.end);
          let total = new Date(Date.parse(end) - Date.parse(start));

          let totalVal = `${String("0" + total.getUTCHours()).slice(
            -2
          )}:${String("0" + total.getUTCMinutes()).slice(-2)}:${String(
            "0" + total.getUTCSeconds()
          ).slice(-2)}`;
          let startVal = `${String("0" + start.getHours()).slice(-2)}:${String(
            "0" + start.getMinutes()
          ).slice(-2)}`;
          let endVal = `${String("0" + end.getHours()).slice(-2)}:${String(
            "0" + end.getMinutes()
          ).slice(-2)}`;

          const isItemSelected = isSelected(row);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              key={index}
              hover
              onClick={(event) => handleClick(event, row)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
            >
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">desc</TableCell>
              <TableCell align="right">{startVal}</TableCell>
              <TableCell align="right">{endVal}</TableCell>
              <TableCell align="right">{totalVal}</TableCell>
              <TableCell align="right">conf</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default InList;
