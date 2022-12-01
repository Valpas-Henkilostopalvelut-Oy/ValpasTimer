import React, { Fragment } from "react";

import { Table, TableContainer, TableBody, TableCell, TableRow, IconButton, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STime, ETime, EditSTime, EditETime, MoreButton } from "./times.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { StatusMD, StatusSM } from "./isSent.jsx";
import { EditDescriptionSM, EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceSM, ChangeWorkplaceMD } from "./workplacechange.jsx";
import { EditDateSM, EditDateMD } from "./editdate.jsx";
import { Tabledescription } from "./editdescription.jsx";

export const Details = ({ date, workplaces = null, lang, isEmpty }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TableContainer>
      <Table aria-label="collapsible table" size="small">
        <TableBody>
          <TableRow
            sx={{
              cursor: "pointer",
            }}
            onClick={() => setOpen(!open)}
          >
            <TableCell>
              <IconButton aria-label="expand row" size="small">
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

            <StatusMD date={date} lang={lang} isEmpty={isEmpty} />
          </TableRow>

          <StatusSM date={date} lang={lang} isEmpty={isEmpty} />

          <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {date.arr.map((row) => {
                        return (
                          <Fragment key={row.id}>
                            <EditDescriptionSM date={row} lang={lang} />
                            <ChangeWorkplaceSM date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} />
                            <EditDateSM data={row} lang={lang} />

                            <TableRow>
                              <EditDescriptionMD date={row} lang={lang} />

                              <ChangeWorkplaceMD
                                date={row}
                                workplaces={workplaces}
                                work={row.workspaceId}
                                lang={lang}
                              />

                              <EditDateMD data={row} lang={lang} />

                              <TableCell align="left">
                                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                                  <EditSTime date={row} /> {"-"} <EditETime date={row} />
                                </Box>
                              </TableCell>

                              <TableCell align="center">
                                <TotalTime date={row} />
                              </TableCell>

                              <TableCell align="right">
                                <MoreButton date={row} lang={lang} isEmpty={isEmpty} />
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
