import React, { Fragment } from "react";

import { Table, TableBody, TableRow, IconButton, Box, TableContainer, useTheme, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Time, EditSTime, EditETime } from "./times.jsx";
import { Moreitem, Moreitemday } from "./buttons.jsx";
import { TotalTime } from "./edittotaltime.jsx";
import { EditDescriptionMD } from "./editdescription.jsx";
import { ChangeWorkplaceMD, ChangeWorkplaceSM } from "./workplacechange.jsx";
import { EditDateMD, EditDate } from "./editdate.jsx";
import { BreakitemMD, AddBreakMD, AddBreakSM, BreakitemSM } from "./break.jsx";
import { totaldaytime, totalweektime } from "./totaltime.jsx";
import { CustomTableCell } from "./tablecell.jsx";
import { PropTypes } from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { weekissent, weekisconformed, sendweek, isSent, maxText } from "./functions.jsx";

const WeekHeadMD = ({ week, selected, lang, isEmpty, isThis, sx }) => {
  const theme = useTheme();
  let isSent = weekissent(week.arr, selected);
  let isConfirmed = weekisconformed(week.arr, selected);
  let h = totalweektime(week).h !== 0 ? totalweektime(week).h + " h " : "";
  let min = totalweektime(week).min !== 0 ? totalweektime(week).min + " min" : "";

  return (
    <TableRow sx={sx}>
      <CustomTableCell
        width={"9%"}
        sx={{
          borderTop: "0px",
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      />

      <CustomTableCell sx={{ borderTop: "0px" }}>
        <Typography variant="h6" color="#ff6600">
          {lang.history.week} {week.week}
        </Typography>
      </CustomTableCell>

      <CustomTableCell align="center" sx={{ borderTop: "0px" }}>
        <Typography variant="p" color="text.secondary">
          {week.period}
        </Typography>
      </CustomTableCell>

      <CustomTableCell align="right" sx={{ borderTop: "0px" }}>
        <Typography variant="p" color="text.secondary">
          {h} {min}
        </Typography>
      </CustomTableCell>

      <CustomTableCell sx={{ borderTop: "0px" }} align="right" width={"9%"}>
        {!isSent ? (
          <IconButton
            size="small"
            sx={{
              ":focus": {
                outline: "0px",
              },
            }}
            disabled={!isEmpty}
            onClick={() => sendweek(week.arr, selected)}
            hidden={isSent || !selected}
          >
            <SendIcon
              sx={{
                color: !isThis ? "error.light" : "default.valpas",
              }}
            />
          </IconButton>
        ) : (
          !isConfirmed && (
            <HourglassTopIcon
              sx={{
                color: "default.valpas",
              }}
            />
          )
        )}
      </CustomTableCell>
    </TableRow>
  );
};

const WeekHeadSM = ({ week, selected, lang, isEmpty, isThis, sx }) => {
  const theme = useTheme();
  let isSent = weekissent(week.arr, selected);
  let isConfirmed = weekisconformed(week.arr, selected);
  let h = totalweektime(week).h !== 0 ? totalweektime(week).h + " h " : "";
  let min = totalweektime(week).min !== 0 ? totalweektime(week).min + " min" : "";
  return (
    <TableRow sx={sx}>
      <CustomTableCell
        width={"9%"}
        sx={{
          borderTop: "0px",
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      />

      <CustomTableCell sx={{ borderTop: "0px" }}>
        <Typography variant="h6" color="#ff6600">
          {lang.history.week} {week.week}
        </Typography>
      </CustomTableCell>

      <CustomTableCell align="left" sx={{ borderTop: "0px" }}>
        <Typography variant="p" color="text.secondary">
          {week.period}
        </Typography>
      </CustomTableCell>

      <CustomTableCell align="left" sx={{ borderTop: "0px" }}>
        <Typography variant="p" color="text.secondary">
          {h} {min}
        </Typography>
      </CustomTableCell>

      <CustomTableCell sx={{ borderTop: "0px" }} align="right" width={"9%"}>
        {!isSent ? (
          <IconButton
            size="small"
            sx={{
              ":focus": {
                outline: "0px",
              },
            }}
            disabled={!isEmpty}
            onClick={() => sendweek(week.arr, selected)}
            hidden={isSent || !selected}
          >
            <SendIcon
              sx={{
                color: !isThis ? "error.light" : "default.valpas",
              }}
            />
          </IconButton>
        ) : (
          !isConfirmed && (
            <HourglassTopIcon
              sx={{
                color: "default.valpas",
              }}
            />
          )
        )}
      </CustomTableCell>
    </TableRow>
  );
};

export const WeekRow = ({ grouped, lang, works, isEmpty, selected, isThis = false }) => {
  const theme = useTheme();
  return grouped.map((week) => {
    return (
      <Fragment key={week.week}>
        <Box
          sx={{
            padding: "10px",
            margin: "30px 0px",
            border: "3px solid #ff6600",
          }}
        >
          <TableContainer>
            <Table aria-label="collapsible table" size="small">
              <TableBody>
                <WeekHeadMD
                  week={week}
                  selected={selected}
                  lang={lang}
                  isEmpty={isEmpty}
                  isThis={isThis}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      display: "none",
                    },
                  }}
                />

                <WeekHeadSM
                  week={week}
                  selected={selected}
                  lang={lang}
                  isEmpty={isEmpty}
                  isThis={isThis}
                  sx={{
                    [theme.breakpoints.up("sm")]: {
                      display: "none",
                    },
                  }}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Row week={week} lang={lang.history} isEmpty={isEmpty} works={works} />
      </Fragment>
    );
  });
};

const Row = ({ week, lang, works, isEmpty }) => {
  const theme = useTheme();

  return (
    week &&
    week.arr.map((date) => {
      console.log(date);
      let h = totaldaytime(date).h !== 0 ? totaldaytime(date).h + " h " : "";
      let min = totaldaytime(date).min !== 0 ? totaldaytime(date).min + " min" : "";

      return (
        <Box
          key={date.id}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "1px",
            backgroundColor: "background.paper",
            marginTop: "6px",
            padding: "3px",
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
                      total={{ h: h, min: min }}
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
                      total={{ h: h, min: min }}
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
        <CustomTableCell sx={{ borderTop: "0px" }} width={"10%"}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </CustomTableCell>

        <CustomTableCell align="left" sx={{ borderTop: "0px" }}>
          <Typography variant="p" fontWeight="800">
            {date}
          </Typography>
        </CustomTableCell>

        <CustomTableCell sx={{ borderTop: "0px" }} />

        <CustomTableCell align="right" sx={{ borderTop: "0px" }}>
          <Moreitemday date={row} lang={lang} isEmpty={isEmpty} />
        </CustomTableCell>
      </TableRow>

      <TableRow sx={sx}>
        <CustomTableCell />
        <CustomTableCell colSpan={3} align="left">
          <Typography variant="p">
            {workplaces.find((item) => item.id === row.workId) !== undefined
              ? workplaces.find((item) => item.id === row.workId).name
              : lang.title.select_workplace}
          </Typography>
        </CustomTableCell>
      </TableRow>

      <TableRow sx={sx}>
        <CustomTableCell align="left" width={"28%"} />

        <CustomTableCell align="left">
          <Typography variant="p">
            <Time time={row.arr[row.arr.length - 1].timeInterval.start} /> - <Time time={row.arr[0].timeInterval.end} />
          </Typography>
        </CustomTableCell>

        <CustomTableCell align="left" colSpan={2}>
          <Typography variant="p">
            {total.h} {total.min}
          </Typography>
        </CustomTableCell>
      </TableRow>

      {open && (
        <>
          <RowDetailsSM data={data} workplaces={workplaces} lang={lang} isEmpty={isEmpty} sx={sx} />
          <AddBreakSM data={data} isEmpty={isEmpty} isDisable={isSent(row)} sx={sx} lang={lang.breaks} />
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
      <TableRow sx={{ ...sx }}>
        <CustomTableCell sx={{ borderTop: "0px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ cursor: "pointer", ":focus": { outline: "0px" } }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </CustomTableCell>

        <CustomTableCell align="left" sx={{ borderTop: "0px" }} width={"20%"}>
          <Typography variant="p" fontWeight="800">
            {date}
          </Typography>
        </CustomTableCell>

        <CustomTableCell align="center" width={"30%"} sx={{ borderTop: "0px" }}>
          <Typography variant="p" fontWeight="800">
            {workplaces.find((item) => item.id === row.workId) !== undefined
              ? workplaces.find((item) => item.id === row.workId).name
              : maxText("Vaihda työpaikkaa", 10)}
          </Typography>
        </CustomTableCell>

        <CustomTableCell align="right" sx={{ borderTop: "0px" }} width={"30%"}>
          <Typography variant="p" fontWeight="800">
            <Time time={row.arr[0].timeInterval.start} /> - <Time time={row.arr[row.arr.length - 1].timeInterval.end} />
          </Typography>
        </CustomTableCell>

        <CustomTableCell align="right" sx={{ borderTop: "0px" }} width="20%">
          <Typography variant="p" fontWeight="800">
            {total.h} {total.min}
          </Typography>
        </CustomTableCell>

        <CustomTableCell align="right" sx={{ borderTop: "0" }}>
          <Moreitemday date={row} lang={lang} isEmpty={isEmpty} />
        </CustomTableCell>
      </TableRow>

      {open && (
        <>
          <RowDetailsMD sx={sx} data={data} workplaces={workplaces} lang={lang} isEmpty={isEmpty} />
          <AddBreakMD sx={sx} data={data} isEmpty={isEmpty} isDisable={isSent(row)} lang={lang.breaks} />
        </>
      )}
    </Fragment>
  );
};

const RowDetailsSM = ({ data, lang, workplaces, isEmpty, sx }) => {
  return data.map((row, i) => {
    return (
      <Fragment key={i}>
        <TableRow sx={sx}>
          <CustomTableCell />
          <ChangeWorkplaceSM
            date={row}
            workplaces={workplaces}
            work={row.workspaceId}
            lang={lang}
            isEmpty={isEmpty}
            sx={{ ...sx }}
          />
        </TableRow>

        <TableRow>
          <CustomTableCell align="center">
            <EditDate data={row} lang={lang} />
          </CustomTableCell>

          <CustomTableCell align="left">
            <EditSTime date={row} /> - <EditETime date={row} />
          </CustomTableCell>

          <CustomTableCell align="left">
            <TotalTime date={row} />
          </CustomTableCell>

          <CustomTableCell align="right">
            <Moreitem date={row} lang={lang} isEmpty={isEmpty} />
          </CustomTableCell>
        </TableRow>

        {row.break &&
          row.break.map((item, i) => (
            <BreakitemSM
              sx={sx}
              key={i}
              item={item}
              data={row}
              index={i}
              isEmpty={isEmpty}
              isSent={data.isSent}
              lang={lang.breaks}
            />
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

          <CustomTableCell align="right">
            <EditSTime date={row} /> {" - "} <EditETime date={row} />
          </CustomTableCell>

          <CustomTableCell align="right">
            <TotalTime date={row} />
          </CustomTableCell>

          <CustomTableCell align="right">
            <Moreitem date={row} lang={lang} isEmpty={isEmpty} />
          </CustomTableCell>
        </TableRow>

        {row.break &&
          row.break.map((item, i) => (
            <BreakitemMD
              sx={sx}
              key={i}
              item={item}
              data={row}
              index={i}
              isEmpty={isEmpty}
              isSent={data.isSent}
              lang={lang.breaks}
            />
          ))}
      </Fragment>
    );
  });
};

DetailsSM.propTypes = {
  row: PropTypes.object,
  workplaces: PropTypes.array,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
  total: PropTypes.object,
  date: PropTypes.string,
  sx: PropTypes.object,
};

DetailsMD.propTypes = {
  row: PropTypes.object,
  workplaces: PropTypes.array,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
  total: PropTypes.object,
  date: PropTypes.string,
  sx: PropTypes.object,
};
