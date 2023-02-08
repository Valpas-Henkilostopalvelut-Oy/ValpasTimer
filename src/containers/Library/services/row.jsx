import React, { useState, useEffect } from "react";
import { Grid, Box, Collapse, Typography, IconButton } from "@mui/material";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { weektotal, daytotal } from "./timecalc";
import { shiftdate, Startdaytime, Enddaytime, Time } from "./times";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { PropTypes } from "prop-types";
import { Moremenuweek, Moremenutimeshift, Moremenuday } from "./morebuttons.jsx";

export const Row = ({ item, all = true, workers }) => {
  let worker =
    workers.filter((w) => w.id === item.userId).length > 0 ? workers.filter((w) => w.id === item.userId)[0] : null;

  return item.arr.map((workeritem, key) => <RowWeek key={key} item={workeritem} worker={worker} />);
};

const RowWeek = ({ item, worker }) => {
  const [open, setOpen] = useState(false);
  let total = weektotal(item.arr);
  total = `${total.hours}h ${total.minutes}min`;
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "default.gray",
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
        <Grid item xs={6} align="center">
          <Typography variant="p">Viikko {item.week}</Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <Typography variant="p">{total}</Typography>
        </Grid>
        <Grid item xs={1} align="right">
          <Moremenuweek date={item.arr} />
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
    <Box
      sx={{
        borderTop: "1px solid",
        borderColor: "default.gray",
      }}
    >
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
        <Grid item xs={1}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="p">{item.day}</Typography>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} align="right">
          <Typography variant="p">
            <Startdaytime date={item.arr} /> - <Enddaytime date={item.arr} />
          </Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <Typography variant="p">{total}</Typography>
        </Grid>
        <Grid item xs={1} align="right">
          <Moremenuday date={item.arr} />
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
  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderColor: "default.gray",
      }}
    >
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
        <Grid item xs={1} />
        <Grid item xs={2}>
          <Typography variant="p">{date}</Typography>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} align="right">
          <Typography variant="p">
            <Time time={start} /> - <Time time={end} />
          </Typography>
        </Grid>
        <Grid item xs={2} align="right">
          <Typography variant="p">Total time</Typography>
        </Grid>
        <Grid item xs={1} align="right">
          <Moremenutimeshift date={item} />
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
