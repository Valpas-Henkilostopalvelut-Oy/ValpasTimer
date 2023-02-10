import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Collapse, Grid, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { weekstatus } from "./status.jsx";
import { Weekconfirm, Daymorebutton, Timeshiftmorebutton } from "./buttons.jsx";
import { STime, ETime, Time, SDate, Totalweek, Totalday, Totaltimeshift, Totalbreak } from "./times.jsx";

const Issent = ({ isSent }) => {
  return (
    <>
      <IconButton disabled hidden={!isSent}>
        <Typography variant="p">Lähetetty: </Typography>
        <TaskAltIcon sx={{ color: "green" }} />
      </IconButton>
      <IconButton disabled hidden={isSent}>
        <Typography variant="p">Lähetetty: </Typography>
        <ClearIcon sx={{ color: "red" }} />
      </IconButton>
    </>
  );
};

const Isconfirmed = ({ isConfirmed }) => {
  return (
    <>
      <IconButton disabled hidden={!isConfirmed}>
        <Typography variant="p">Vahvistettu: </Typography>
        <TaskAltIcon sx={{ color: "green" }} />
      </IconButton>
      <IconButton disabled hidden={isConfirmed}>
        <Typography variant="p">Vahvistettu: </Typography>
        <ClearIcon sx={{ color: "red" }} />
      </IconButton>
    </>
  );
};

export const Rowweek = ({ timeList, isEmpty, selected, data }) => {
  const arr = timeList.arr;
  const status = weekstatus(timeList);
  const theme = useTheme();

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ border: "3px solid", borderColor: "default.orange", padding: "20px 40px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={1} sx={{ [theme.breakpoints.down("md")]: { display: "none" } }} />

            <Grid item md={2} xs={6} align="center">
              <Typography variant="p">Viikko {timeList.week}</Typography>
            </Grid>

            <Grid item md={3} xs={6} align="center">
              <Typography variant="p">{timeList.period}</Typography>
            </Grid>

            <Grid item md={1.5} xs={3} align="right">
              <Issent isSent={status.isSent} />
            </Grid>

            <Grid item md={1.5} xs={3} align="left">
              <Isconfirmed isConfirmed={status.isConfirmed} />
            </Grid>

            <Grid item md={2} xs={3} align="right">
              <Typography variant="p">
                <Totalweek timeList={timeList} />
              </Typography>
            </Grid>

            <Grid item md={1} xs={3} align="right">
              <Weekconfirm week={timeList} isEmpty={isEmpty} />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {arr.map((item) => {
        return (
          <Grid item xs={12} key={item.day}>
            <Rowday item={item} isEmpty={isEmpty} selected={selected} data={data} />
          </Grid>
        );
      })}
    </>
  );
};

const Rowday = ({ item, isEmpty, selected, data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  let currentworkplace = data.works.find((workplace) => workplace.id === selected.work).name;

  return (
    <Box sx={{ border: "1px solid", borderColor: "#e6e6ef" }}>
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
        <Grid item md={1} align="left">
          <IconButton onClick={handleOpen} sx={{ cursor: "pointer" }} aria-label="expand row" size="mdall">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>

        <Grid item md={2} align="left">
          <Typography variant="p" fontWeight="bold">
            {item.date}
          </Typography>
        </Grid>

        <Grid item md={3} align="center">
          <Typography variant="p" fontWeight="bold">
            {currentworkplace}
          </Typography>
        </Grid>

        <Grid item md={3} align="center">
          <STime date={item} fontWeight="bold" /> - <ETime date={item} fontWeight="bold" />
        </Grid>

        <Grid item md={2} align="right">
          <Totalday item={item} fontWeight="bold" />
        </Grid>

        <Grid item md={1} align="right">
          <Daymorebutton day={item} isEmpty={isEmpty} />
        </Grid>
      </Grid>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.arr
          .sort((a, b) => {
            a = new Date(a.timeshift.timeInterval.start);
            b = new Date(b.timeshift.timeInterval.start);

            return a - b;
          })
          .map((item) => {
            return <Rowtimeshift item={item} isEmpty={isEmpty} key={item.id} />;
          })}
      </Collapse>
    </Box>
  );
};

/**{
    "name": "Työkohde",
    "description": "Työkohde 1",
    "id": "1672223915761"
} */

const Rowtimeshift = ({ item, isEmpty }) => {
  item = item.timeshift;
  let breaks = item.break ? item.break : [];
  let work = item.work ? item.work : { name: "Ei valintaa" };

  return (
    <>
      <Box sx={{ borderTop: "1px solid", borderColor: "#e6e6ef" }}>
        <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
          <Grid item md={1} align="left" />

          <Grid item md={2} align="left">
            <SDate date={item.timeInterval.start} />
          </Grid>

          <Grid item md={3} align="center">
            <Typography variant="p">{work.name}</Typography>
          </Grid>

          <Grid item md={3} align="center">
            <Time time={item.timeInterval.start} /> - <Time time={item.timeInterval.end} />
          </Grid>

          <Grid item md={2} align="right">
            <Totaltimeshift item={item} />
          </Grid>

          <Grid item md={1} align="right">
            <Timeshiftmorebutton timeshift={item} isEmpty={isEmpty} />
          </Grid>
        </Grid>
      </Box>

      {breaks.map((item) => {
        return <Rowbreaks item={item} isEmpty={isEmpty} key={item.id} />;
      })}
    </>
  );
};

const Rowbreaks = ({ item, isEmpty }) => {
  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "#e6e6ef" }}>
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
        <Grid item md={1} align="left" />

        <Grid item md={2} align="left" />

        <Grid item md={3} align="center">
          <Typography variant="p">{item.reason}</Typography>
        </Grid>

        <Grid item md={3} align="center">
          <Time time={item.start} /> - <Time time={item.end} />
        </Grid>

        <Grid item md={2} align="right">
          <Totalbreak item={item} />
        </Grid>

        <Grid item md={1} align="right"></Grid>
      </Grid>
    </Box>
  );
};
