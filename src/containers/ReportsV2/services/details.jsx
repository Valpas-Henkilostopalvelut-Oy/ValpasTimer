import React, { Fragment, useState } from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow, Paper, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ETime, STime } from "./times.jsx";

export const Details = ({ date }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <IconButton aria-label="expand now" size="small" onClick={handleClick}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>Description "Later"</TableCell>
            <TableCell align="right">
              <STime date={date} />
            </TableCell>
            <TableCell align="right">
              <ETime date={date} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
