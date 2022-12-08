import React, { Fragment } from "react";

import { Table, TableBody, TableCell, TableRow, IconButton, Box, TableContainer } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STime, ETime, EditSTime, EditETime, MoreButton } from "./times.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { StatusMD, StatusSM, Emptycell } from "./isSent.jsx";
import { EditDescriptionSM, EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceSM, ChangeWorkplaceMD } from "./workplacechange.jsx";
import { EditDateSM, EditDateMD } from "./editdate.jsx";
import { PropTypes } from "prop-types";

export const Main = ({ row, workplaces, lang, isEmpty }) => {
  return (
    <TableContainer>
      <Table aria-label="collapsible table" size="small">
        <TableBody>
          {row.arr.map((row, index) => (
            <Details key={index} row={row} workplaces={workplaces} lang={lang} isEmpty={isEmpty} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Details = ({ row, lang, workplaces, isEmpty }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Fragment>
      <TableRow onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{workplaces.find((item) => item.id === row.workId) !== undefined ? workplaces.find((item) => item.id === row.workId).name : "Vaihda työpaikkaa"}</TableCell>

        <Emptycell />

        <TableCell align="right">
          <Box display="flex" justifyContent="space-around" width="120px">
            <STime date={row} /> - <ETime date={row} />
          </Box>
        </TableCell>

        <StatusMD date={row} lang={lang} isEmpty={isEmpty} />
      </TableRow>

      <StatusSM date={row} lang={lang} isEmpty={isEmpty} />

      {open && row.arr.map((date, i) => <RowDetails key={i} row={date} lang={lang} workplaces={workplaces} isEmpty={isEmpty} />)}
    </Fragment>
  );
};

const RowDetails = ({ row, lang, workplaces, isEmpty }) => {
  return (
    <Fragment>
      <EditDescriptionSM date={row} lang={lang} />
      <ChangeWorkplaceSM date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />
      <EditDateSM data={row} lang={lang} />
      <TableRow>
        <EditDescriptionMD date={row} lang={lang} />

        <ChangeWorkplaceMD date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />

        <EditDateMD data={row} lang={lang} />

        <TableCell align="right">
          <Box display="flex" justifyContent="space-around" width="120px">
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
    </Fragment>
  );
};

Main.propTypes = {
  row: PropTypes.object,
  workplaces: PropTypes.array,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
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
