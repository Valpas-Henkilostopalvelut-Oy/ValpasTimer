import React, { useState } from "react";
import { Table, TableContainer, TableBody, TableCell, TableRow, Paper, IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ETime, STime } from "./times.jsx";
import { Detailsrow } from "./row.jsx";
import { EDiscription } from "./editdescription.jsx";
import { ConfirmreportMD, ConfirmreportSM } from "./confirmreport.jsx";
import { PropTypes } from "prop-types";

export const Details = ({ date, isEmpty = true, lang }) => {
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
              <EDiscription data={date} lang={lang} />
            </TableCell>
            <TableCell align="right">
              <STime date={date} />
            </TableCell>
            <TableCell align="right">
              <ETime date={date} />
            </TableCell>

            <ConfirmreportMD date={date} isEmpty={isEmpty} lang={lang} />
          </TableRow>

          <ConfirmreportSM date={date} isEmpty={isEmpty} lang={lang} />

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

Details.propTypes = {
  date: PropTypes.object.isRequired,
  isEmpty: PropTypes.bool,
  lang: PropTypes.string.isRequired,
};
