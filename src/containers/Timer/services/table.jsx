import React, { Fragment } from "react";

import { Table, TableBody, TableCell, TableRow, IconButton, Collapse, Box, TableContainer } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STime, ETime, EditSTime, EditETime, MoreButton } from "./times.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { StatusMD, StatusSM } from "./isSent.jsx";
import { EditDescriptionSM, EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceSM, ChangeWorkplaceMD } from "./workplacechange.jsx";
import { EditDateSM, EditDateMD } from "./editdate.jsx";
import { PropTypes } from "prop-types";

export const Details = ({ row, workplaces, lang, isEmpty }) => {
  console.log();
  const [open, setOpen] = React.useState(false);
  return (
    <TableContainer>
      {row.arr.length > 1 ? (
        <Table aria-label="collapsible table" size="small">
          <TableBody>
            <Fragment>
              <TableRow onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small">
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell align="right">{workplaces.find((item) => item.id === row.workId).name}</TableCell>
                <TableCell>
                  <Box width="60px" />
                </TableCell>

                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "space-around", width: "120px" }}>
                    <STime date={row} /> - <ETime date={row} />
                  </Box>
                </TableCell>

                <StatusMD date={row} lang={lang} isEmpty={isEmpty} />
              </TableRow>

              <StatusSM date={row} lang={lang} isEmpty={isEmpty} />

              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{
                    p: 0,
                  }}
                >
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    {row.arr.map((date, i) => (
                      <RowDetails key={i} row={date} lang={lang} workplaces={workplaces} isEmpty={isEmpty} />
                    ))}
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          </TableBody>
        </Table>
      ) : (
        <RowDetails row={row.arr[0]} lang={lang} workplaces={workplaces} isEmpty={isEmpty} />
      )}
    </TableContainer>
  );
};

const RowDetails = ({ row, lang, workplaces, isEmpty }) => {
  return (
    <Table size="small">
      <TableBody>
        <EditDescriptionSM date={row} lang={lang} />
        <ChangeWorkplaceSM date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />
        <EditDateSM data={row} lang={lang} />
        <TableRow>
          <EditDescriptionMD date={row} lang={lang} />

          <ChangeWorkplaceMD date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />

          <EditDateMD data={row} lang={lang} />

          <TableCell align="right">
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "120px" }}>
              <EditSTime date={row} /> {"-"} <EditETime date={row} />
            </Box>
          </TableCell>

          <TableCell align="right">
            <TotalTime date={row} />
          </TableCell>

          <TableCell align="right">
            <MoreButton date={row} lang={lang} isEmpty={isEmpty} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

Details.propTypes = {
  row: PropTypes.object,
  lang: PropTypes.object,
  workplaces: PropTypes.array,
  isEmpty: PropTypes.bool,
};

RowDetails.propTypes = {
  row: PropTypes.object,
  lang: PropTypes.object,
  workplaces: PropTypes.array,
  isEmpty: PropTypes.bool,
};
