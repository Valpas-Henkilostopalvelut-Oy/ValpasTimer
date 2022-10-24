import React from "react";

import { Table, TableContainer, TableBody, TableCell, TableRow, Paper, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STime, ETime, EditSTime, EditETime, TotalTime } from "../services/times.jsx";
import { ReportAll } from "../services/report.jsx";
import { DeleteAll } from "../services/delete.jsx";
import { EditDescription } from "../services/editdescription.jsx";

export const Details = ({ date }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <IconButton aria-label="expand now" size="small" onClick={() => setOpen(!open)}>
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

          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {date.arr.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row" sx={{ paddingLeft: 1, paddingRight: 1 }}>
                              <EditDescription date={row} />
                            </TableCell>
                            <TableCell align="right" sx={{ paddingLeft: 1, paddingRight: 1, display: "flex" }}>
                              <EditSTime date={row} /> {"-"} <EditETime date={row} />
                            </TableCell>

                            <TableCell align="right" sx={{ paddingLeft: 1, paddingRight: 1 }}>
                              <TotalTime date={row} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
