import React, { Fragment } from "react";

import { Table, TableBody, TableCell, TableRow, IconButton, Box, TableContainer, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { STime, ETime, EditSTime, EditETime } from "./times.jsx";
import { MoreButton } from "./buttons.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { StatusMD, StatusSM, Emptycell } from "./isSent.jsx";
import { EditDescriptionSM, EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceSM, ChangeWorkplaceMD } from "./workplacechange.jsx";
import { EditDateSM, EditDateMD } from "./editdate.jsx";
import { PropTypes } from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import { Breakslist } from "./break.jsx";

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
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">
          {workplaces.find((item) => item.id === row.workId) !== undefined
            ? workplaces.find((item) => item.id === row.workId).name
            : "Vaihda työpaikkaa"}
        </TableCell>

        <TableCell align="left">
          <Box display="flex" justifyContent="space-evenly">
            <STime date={row} /> - <ETime date={row} />
          </Box>
        </TableCell>

        <StatusMD date={row} lang={lang} isEmpty={isEmpty} />
      </TableRow>

      <StatusSM date={row} lang={lang} isEmpty={isEmpty} />

      <TableRow>
        <TableCell colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer>
              <Table aria-label="collapsible table" size="small">
                <TableBody>
                  <RowDetails data={row} workplaces={workplaces} lang={lang} isEmpty={isEmpty} />
                  <TableRow>
                    <TableCell colSpan={7}>
                      <AddIcon />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const RowDetails = ({ data, lang, workplaces, isEmpty }) => {
  return data.arr.map((row, i) => (
    <Fragment key={i}>
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

      <Breakslist data={row} />
    </Fragment>
  ));
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
