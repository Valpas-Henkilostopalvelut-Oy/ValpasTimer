import React, { useState, useEffect } from "react";
import { Grid, Box, Collapse, Typography, IconButton } from "@mui/material";
import { weektotal, daytotal, timeshifttotal } from "./timecalc";
import { shiftdate, Startdaytime, Enddaytime, Time } from "./times";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { PropTypes } from "prop-types";
import { Payweek, Moremenutimeshift, Moremenuday } from "./morebuttons.jsx";

const isPaidWeek = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let week = arr[i].arr;
    for (let j = 0; j < week.length; j++) {
      let day = week[j];
      if (!day.timeshift.isLocked) {
        return false;
      }
    }
  }
  return true;
};

const isPaidDay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].timeshift.isLocked) {
      return false;
    }
  }
  return true;
};

const isPaidTimeshift = (item) => {
  return item.timeshift.isLocked;
};

export const Row = ({ item, all = true, workers, workname }) => {
  let worker =
    workers.filter((w) => w.id === item.userId).length > 0 ? workers.filter((w) => w.id === item.userId)[0] : null;

  return item.arr.map((workeritem, key) => <RowWeek key={key} item={workeritem} worker={worker} workname={workname} />);
};

const RowWeek = ({ item, worker, workname }) => {
  const [open, setOpen] = useState(false);
  let total = weektotal(item.arr);
  total = `${total.hours}h ${total.minutes}min`;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "#e6e6ef",
        margin: "15px 0px",
      }}
    >
      <Grid container spacing={2} alignItems="center" sx={{ padding: "20px 40px" }}>
        <Grid item xs={1}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="p">
            {worker.first_name} {worker.last_name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {isPaidWeek(item.arr) ? (
            <Typography variant="p" sx={{ color: "success.main" }}>
              Maksettu
            </Typography>
          ) : (
            <Typography variant="p" sx={{ color: "error.main" }}>
              Ei maksettu
            </Typography>
          )}
        </Grid>

        <Grid item xs={2} align="center">
          <Typography variant="p">Viikko {item.week}</Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2} align="right">
          <Typography variant="p">{total}</Typography>
        </Grid>
        <Grid item xs={1} align="right">
          <Payweek
            date={item}
            paid={isPaidWeek(item.arr)}
            worker={`${worker.first_name} ${worker.last_name}`}
            workname={workname}
          />
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.arr.map((item) => (
          <RowDay item={item} key={item.day} />
        ))}
      </Collapse>
    </Box>
  );
};

const RowDay = ({ item }) => {
  let total = daytotal(item.arr);
  total = `${total.hours}h ${total.minutes}min`;
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "#e6e6ef" }}>
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
        <Grid item xs={1}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="p">{item.day}</Typography>
        </Grid>

        <Grid item xs={3}>
          {isPaidDay(item.arr) ? (
            <Typography variant="p" sx={{ color: "success.main" }}>
              Maksettu
            </Typography>
          ) : (
            <Typography variant="p" sx={{ color: "error.main" }}>
              Ei maksettu
            </Typography>
          )}
        </Grid>
        <Grid item xs={3} align="right">
          <Typography variant="p">
            <Startdaytime date={item.arr} /> - <Enddaytime date={item.arr} />
          </Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <Typography variant="p">{total}</Typography>
        </Grid>
        <Grid item xs={1} align="right">
          <Moremenuday date={item.arr} paid={isPaidDay(item.arr)} />
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.arr.map((item) => (
          <RowTimeshift item={item} key={item.id} />
        ))}
      </Collapse>
    </Box>
  );
};

const RowTimeshift = ({ item }) => {
  const date = shiftdate(item.timeshift.timeInterval.start);
  const start = item.timeshift.timeInterval.start;
  const end = item.timeshift.timeInterval.end;
  const total = timeshifttotal(item);

  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "#e6e6ef" }}>
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
        <Grid item xs={1} />
        <Grid item xs={2}>
          <Typography variant="p">{date}</Typography>
        </Grid>
        <Grid item xs={3}>
          {isPaidTimeshift(item) ? (
            <Typography variant="p" sx={{ color: "success.main" }}>
              Maksettu
            </Typography>
          ) : (
            <Typography variant="p" sx={{ color: "error.main" }}>
              Ei maksettu
            </Typography>
          )}
        </Grid>
        <Grid item xs={3} align="right">
          <Typography variant="p">
            <Time time={start} /> - <Time time={end} />
          </Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <Typography variant="p">{`${total.hours}h ${total.minutes}min`}</Typography>
        </Grid>
        <Grid item xs={1} align="right">
          <Moremenutimeshift date={item} paid={isPaidTimeshift(item)} />
        </Grid>
      </Grid>
    </Box>
  );
};

Row.propTypes = {
  item: PropTypes.object,
};

RowWeek.propTypes = {
  item: PropTypes.object,
  worker: PropTypes.string,
};

RowDay.propTypes = {
  item: PropTypes.object,
};

RowTimeshift.propTypes = {
  item: PropTypes.object,
};
