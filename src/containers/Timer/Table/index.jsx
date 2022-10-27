import React, { Fragment } from "react";

import { Table, TableContainer, TableBody, TableCell, TableRow, Paper, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STime, ETime, EditSTime, EditETime, TotalTime, MoreButton } from "../services/times.jsx";
import { IsSentMD, IsSentSM } from "../services/isSent";
import { EditDescriptionSM, EditDescriptionMD } from "../services/editdescription.jsx";
import { ChangeWorkplaceSM, ChangeWorkplaceMD } from "../services/workplaceselect.jsx";
import { EditDate } from "../services/editdate.jsx";

export const Details = ({ date }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <IconButton aria-label="expand now" size="small" onClick={handleOpen}>
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
            <IsSentMD date={date} />
          </TableRow>

          <IsSentSM date={date} />

          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {date.arr.map((row, index) => {
                        return (
                          <Fragment key={row.id}>
                            <EditDescriptionSM date={row} />
                            <ChangeWorkplaceSM date={row} />

                            <TableRow>
                              <EditDescriptionMD date={row} />

                              <ChangeWorkplaceMD date={row} />

                              <TableCell align="right">
                                <EditDate date={row} />
                              </TableCell>

                              <TableCell align="right" sx={{ paddingLeft: 1, paddingRight: 1 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                  <EditSTime date={row} /> {"-"} <EditETime date={row} />
                                </Box>
                              </TableCell>

                              <TableCell align="right" sx={{ paddingLeft: 1, paddingRight: 1 }}>
                                <TotalTime date={row} />
                              </TableCell>

                              <TableCell align="right" sx={{ paddingLeft: 1, paddingRight: 1 }}>
                                <MoreButton date={row} />
                              </TableCell>
                            </TableRow>
                          </Fragment>
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
