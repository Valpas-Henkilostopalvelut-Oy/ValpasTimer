import React, { Fragment } from "react";

import { Table, TableBody, TableCell, TableRow, IconButton, Collapse, Box } from "@mui/material";
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
    <Fragment>
      <TableRow onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{workplaces.find((item) => item.id === row.workId).name}</TableCell>
        <TableCell align="right">
          <STime date={row} />
        </TableCell>
        <TableCell align="right">
          <ETime date={row} />
        </TableCell>

        <StatusMD date={row} lang={lang} isEmpty={isEmpty} />
      </TableRow>

      <StatusSM date={row} lang={lang} isEmpty={isEmpty} />

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Row row={row} lang={lang} workplaces={workplaces} isEmpty={isEmpty} open={open} />
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const Row = ({ row, lang, workplaces, isEmpty, open }) => {
  return row.arr.map((row) => (
    <Collapse in={open} timeout="auto" unmountOnExit key={row.id}>
      <Table size="small" aria-label="purchases">
        <TableBody>
          <EditDescriptionSM date={row} lang={lang} />
          <ChangeWorkplaceSM date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />
          <EditDateSM data={row} lang={lang} />

          <TableRow>
            <EditDescriptionMD date={row} lang={lang} />

            <ChangeWorkplaceMD date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />

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
        </TableBody>
      </Table>
    </Collapse>
  ));
};

Details.propTypes = {
  row: PropTypes.object,
  lang: PropTypes.object,
  workplaces: PropTypes.array,
  isEmpty: PropTypes.bool,
};

Row.propTypes = {
  row: PropTypes.object,
  lang: PropTypes.object,
  workplaces: PropTypes.array,
  isEmpty: PropTypes.bool,
  open: PropTypes.bool,
};
