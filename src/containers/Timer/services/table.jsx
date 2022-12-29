import React, { Fragment } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Box,
  TableContainer,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Time, EditSTime, EditETime } from "./times.jsx";
import { Moreitem, Moreitemday, Reportallweek } from "./buttons.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceMD } from "./workplacechange.jsx";
import { EditDateMD } from "./editdate.jsx";
import { PropTypes } from "prop-types";
import { BreakitemMD, AddBreakMD, AddBreakSM } from "./break.jsx";
import { totaldaytime, totalweektime } from "./totaltime.jsx";

const isSent = (data) => {
  const items = data.arr.length;
  const sent = data.arr.filter((item) => item.isSent === true).length;

  return sent === items;
};

export const WeekRow = ({ grouped, lang, works, isEmpty, selected }) => {
  return grouped.map((week) => (
    <Fragment key={week.week}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          marginTop: 1,
          marginBottom: 1,
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

      <Row week={week} lang={lang.history} isEmpty={isEmpty} works={works} />
    </Fragment>
  ));
};

const Row = ({ week, lang, works, isEmpty }) => {
  const theme = useTheme();

  return (
    week &&
    week.arr.map((date) => {
      let hours = String(totaldaytime(date).h).padStart(2, "0");
      let minutes = String(totaldaytime(date).min).padStart(2, "0");

      return (
        <Box
          key={date.date}
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
                  <Fragment key={index}>
                    <DetailsMD
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          display: "none",
                        },
                      }}
                      key={[index, "md"]}
                      row={row}
                      workplaces={works}
                      lang={lang}
                      isEmpty={isEmpty}
                      total={`${hours}:${minutes}`}
                      date={date.date}
                    />
                    <DetailsSM
                      sx={{
                        [theme.breakpoints.up("sm")]: {
                          display: "none",
                        },
                      }}
                      key={[index, "sm"]}
                      row={row}
                      workplaces={works}
                      lang={lang}
                      isEmpty={isEmpty}
                      total={`${hours}:${minutes}`}
                      date={date.date}
                    />
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    })
  );
};

const DetailsSM = ({ row, workplaces, lang, isEmpty, total, date, sx }) => {
  const [open, setOpen] = React.useState(false);

  const data = row.arr.sort((a, b) => {
    let sTime = new Date(a.timeInterval.start);
    let eTime = new Date(b.timeInterval.start);

    return sTime - eTime;
  });

  return (
    <Fragment>
      <TableRow sx={sx}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <Typography variant="p">{date}</Typography>
        </TableCell>

        <TableCell align="right">
          <Moreitemday date={row} lang={lang} isEmpty={isEmpty} />
        </TableCell>
      </TableRow>

      <TableRow sx={sx}>
        <TableCell colSpan={3}>
          <Typography variant="p">
            {workplaces.find((item) => item.id === row.workId) !== undefined
              ? workplaces.find((item) => item.id === row.workId).name
              : "Vaihda työpaikkaa"}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow sx={sx}>
        <TableCell align="left">
          <Typography variant="p">
            <Time time={row.arr[row.arr.length - 1].timeInterval.start} />
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Typography variant="p">
            <Time time={row.arr[0].timeInterval.end} />
          </Typography>
        </TableCell>

        <TableCell align="right">
          <Typography variant="p">{total}</Typography>
        </TableCell>
      </TableRow>

      {open && (
        <>
          <RowDetailsSM data={data} workplaces={workplaces} lang={lang} isEmpty={isEmpty} sx={sx} />
          <AddBreakSM data={data} isEmpty={isEmpty} isDisable={isSent(row)} />
        </>
      )}
    </Fragment>
  );
};

const DetailsMD = ({ row, workplaces, lang, isEmpty, total, date, sx }) => {
  const [open, setOpen] = React.useState(false);
  const data = row.arr.sort((a, b) => {
    let sTime = new Date(a.timeInterval.start);
    let eTime = new Date(b.timeInterval.start);

    return sTime - eTime;
  });

  return (
    <Fragment>
      <TableRow sx={sx}>
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
          <Moreitemday date={row} lang={lang} isEmpty={isEmpty} />
        </TableCell>
      </TableRow>

      {open && (
        <>
          <RowDetailsMD sx={sx} data={data} workplaces={workplaces} lang={lang} isEmpty={isEmpty} />
          <AddBreakMD sx={sx} data={data} isEmpty={isEmpty} isDisable={isSent(row)} />
        </>
      )}
    </Fragment>
  );
};

const RowDetailsSM = ({ data, lang, workplaces, isEmpty, sx }) => {
  return data.map((row, i) => {
    return (
      <Fragment key={i}>
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

        {row.break &&
          row.break.map((item, i) => (
            <BreakitemMD sx={sx} key={i} item={item} data={row} index={i} isEmpty={isEmpty} isSent={data.isSent} />
          ))}
      </Fragment>
    );
  });
};

const RowDetailsMD = ({ data, lang, workplaces, isEmpty, sx }) => {
  return data.map((row, i) => {
    return (
      <Fragment key={i}>
        <TableRow sx={sx}>
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

        {row.break &&
          row.break.map((item, i) => (
            <BreakitemMD sx={sx} key={i} item={item} data={row} index={i} isEmpty={isEmpty} isSent={data.isSent} />
          ))}
      </Fragment>
    );
  });
};
