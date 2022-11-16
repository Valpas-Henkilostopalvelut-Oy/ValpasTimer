import React, { Fragment } from "react";

import { Table, TableContainer, TableBody, TableCell, TableRow, Paper, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STime, ETime, EditSTime, EditETime, MoreButton } from "./times.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { IsSentMD, IsSentSM } from "./isSent.jsx";
import { EditDescriptionSM, EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceSM, ChangeWorkplaceMD } from "./workplacechange.jsx";
import { EditDate } from "./editdate.jsx";
import { Tabledescription } from "./editdescription.jsx";

export const Details = ({ date, workplaces = null, lang }) => {
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
            <TableCell>
              <Tabledescription date={date} lang={lang} />
            </TableCell>
            <TableCell align="right">
              <STime date={date} />
            </TableCell>
            <TableCell align="right">
              <ETime date={date} />
            </TableCell>
            <IsSentMD date={date} lang={lang} />
          </TableRow>

          <IsSentSM date={date} lang={lang} />

          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {date.arr.map((row, index) => {
                        return (
                          <Fragment key={row.id}>
                            <EditDescriptionSM date={row} lang={lang} />
                            <ChangeWorkplaceSM date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} />

                            <TableRow>
                              <EditDescriptionMD date={row} lang={lang} />

                              <ChangeWorkplaceMD
                                date={row}
                                workplaces={workplaces}
                                work={row.workspaceId}
                                lang={lang}
                              />

                              <TableCell align="right">
                                <EditDate date={row} lang={lang} />
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
                                <MoreButton date={row} lang={lang} />
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
