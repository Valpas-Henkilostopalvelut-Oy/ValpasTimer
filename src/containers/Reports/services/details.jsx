import React, { useState } from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow, Paper, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ETime, STime } from "./times.jsx";
import { Detailsrow } from "./row.jsx";
import { EDiscription } from "./editdescription.jsx";
import { ConfirmreportMD, ConfirmreportSM } from "./confirmreport.jsx";

export const Details = ({ date, isEmpty = true }) => {
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
            <TableCell>
              <EDiscription data={date} />
            </TableCell>
            <TableCell align="right">
              <STime date={date} />
            </TableCell>
            <TableCell align="right">
              <ETime date={date} />
            </TableCell>

            <ConfirmreportMD date={date} isEmpty={isEmpty} />
          </TableRow>

          <ConfirmreportSM date={date} isEmpty={isEmpty} />

          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={5}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Detailsrow date={date} />
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
