import React, { Fragment } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Box,
  TableContainer,
  Collapse,
  Typography,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Time, EditSTime, EditETime } from "./times.jsx";
import { Moreitem, Moreitemday } from "./buttons.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { StatusMD, StatusSM, Emptycell } from "./isSent.jsx";
import { EditDescriptionSM, EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceSM, ChangeWorkplaceMD } from "./workplacechange.jsx";
import { EditDateSM, EditDateMD } from "./editdate.jsx";
import { PropTypes } from "prop-types";
import { Breakslist, AddBreak } from "./break.jsx";
import { totaldaytime, totalweektime } from "./totaltime.jsx";
import { Reportallweek } from "./buttons.jsx";

const isSent = (data) => {
  const items = data.arr.length;
  const sent = data.arr.filter((item) => item.isSent === true).length;

  return sent === items;
};

export const WeekRow = ({ grouped, lang, works, isEmpty, selected }) => {
  return grouped.map((week) => (
    <Grid item spacing={2} key={week.week}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "background.paper",
          justifyContent: "space-between",
          marginTop: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 1,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            {lang.history.week} {week.week}
          </Typography>

          <Typography variant="p" color="text.secondary">
            {lang.history.total_time} {totalweektime(week).h > 9 ? totalweektime(week).h : "0" + totalweektime(week).h}:
            {totalweektime(week).min > 9 ? totalweektime(week).min : "0" + totalweektime(week).min}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {week.period}
          </Typography>
        </Box>
        <Reportallweek date={week} isEmpty={isEmpty} lang={lang.history} selected={selected} />
      </Box>

      <Row week={week} lang={lang.history} isEmpty={isEmpty} works={works} />
    </Grid>
  ));
};

const Row = ({ week, lang, works, isEmpty }) => {
  return (
    week &&
    week.arr.map((date) => {
      let hours = String(totaldaytime(date).h).padStart(2, "0");
      let minutes = String(totaldaytime(date).min).padStart(2, "0");
      return (
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "1px",
            backgroundColor: "background.paper",
            marginTop: "10px",
            padding: 1,
          }}
        >
          <TableContainer>
            <Table aria-label="collapsible table" size="small">
              <TableBody>
                {date.arr.map((row, index) => (
                  <Details
                    key={index}
                    row={row}
                    workplaces={works}
                    lang={lang}
                    isEmpty={isEmpty}
                    total={`${hours}:${minutes}`}
                    date={date.date}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    })
  );
};

const Details = ({ row, lang, workplaces, isEmpty, total, date }) => {
  const [open, setOpen] = React.useState(false);

  const data = row.arr.sort((a, b) => {
    let sTime = new Date(a.timeInterval.start);
    let eTime = new Date(b.timeInterval.start);

    return sTime - eTime;
  });

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">
          <Typography variant="p">{date}</Typography>
        </TableCell>

        <TableCell align="left">
          <Typography variant="p">
            {workplaces.find((item) => item.id === row.workId) !== undefined
              ? workplaces.find((item) => item.id === row.workId).name
              : "Vaihda työpaikkaa"}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="p">
            <Time time={row.arr[row.arr.length - 1].timeInterval.start} /> - <Time time={row.arr[0].timeInterval.end} />
          </Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="p">{total}</Typography>
        </TableCell>

        <TableCell align="right">
          <Moreitemday date={row} isEmpty={isEmpty} />
        </TableCell>
      </TableRow>

      {open && (
        <>
          <RowDetails data={data} workplaces={workplaces} lang={lang} isEmpty={isEmpty} />
          <AddBreak data={data} isEmpty={isEmpty} isDisable={isSent(row)} />
        </>
      )}
    </Fragment>
  );
};

const RowDetails = ({ data, lang, workplaces, isEmpty }) => {
  return data.map((row, i) => {
    return (
      <Fragment key={i}>
        <EditDescriptionSM date={row} lang={lang} />
        <ChangeWorkplaceSM date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />
        <EditDateSM data={row} lang={lang} />
        <TableRow>
          <EditDescriptionMD date={row} lang={lang} />

          <EditDateMD data={row} lang={lang} />

          <ChangeWorkplaceMD date={row} workplaces={workplaces} work={row.workspaceId} lang={lang} isEmpty={isEmpty} />

          <TableCell align="right">
            <EditSTime date={row} /> {" - "} <EditETime date={row} />
          </TableCell>

          <TableCell align="right">
            <TotalTime date={row} />
          </TableCell>

          <TableCell align="right">
            <Moreitem date={row} lang={lang} isEmpty={isEmpty} />
          </TableCell>
        </TableRow>
        <Breakslist data={row} isEmpty={isEmpty} />
      </Fragment>
    );
  });
};
