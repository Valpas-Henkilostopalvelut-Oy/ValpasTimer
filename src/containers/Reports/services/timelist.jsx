import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { weekstatus } from "./status.jsx";
import { Weekconfirm, Daymorebutton, Timeshiftmorebutton } from "./buttons.jsx";
import { STime, ETime, Time, SDate, Totalweek, Totalday, Totaltimeshift, Totalbreak } from "./times.jsx";
import { useAppContext } from "../../../services/contextLib.jsx";
import { Breakreason } from "../../../models/index.js";

const breaksArr = () => {
  const lang = useAppContext().langValue.service.breaks;
  return [
    { id: Breakreason.LUNCH, name: lang.lunch },
    { id: Breakreason.LUNCH_L, name: lang.lunch_l },
    { id: Breakreason.SHORT, name: lang.short },
    { id: Breakreason.LONG, name: lang.long },
    { id: Breakreason.GOING, name: lang.going },
    { id: Breakreason.ACCIDENT, name: lang.accident },
  ];
};

const Issent = ({ isSent }) => {
  return (
    <>
      <Box hidden={!isSent}>
        <Typography variant="p">Lähetetty: </Typography>
        <TaskAltIcon sx={{ color: "green" }} />
      </Box>
      <Box hidden={isSent}>
        <Typography variant="p">Lähetetty: </Typography>
        <ClearIcon sx={{ color: "red" }} />
      </Box>
    </>
  );
};

const Isconfirmed = ({ isConfirmed }) => {
  return (
    <>
      <Box hidden={!isConfirmed}>
        <Typography variant="p">Vahvistettu: </Typography>
        <TaskAltIcon sx={{ color: "green" }} />
      </Box>
      <Box hidden={isConfirmed}>
        <Typography variant="p">Vahvistettu: </Typography>
        <ClearIcon sx={{ color: "red" }} />
      </Box>
    </>
  );
};

export const Rowweek = ({ timeList, isEmpty, selected, data }) => {
  const arr = timeList.arr;
  const status = weekstatus(timeList);

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ border: "3px solid", borderColor: "default.orange", padding: "20px 40px" }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item sm={1} xs={12} />

            <Grid item sm={2}>
              <Typography variant="p">Viikko {timeList.week}</Typography>
            </Grid>

            <Grid item sm={3}>
              <Typography variant="p">{timeList.period}</Typography>
            </Grid>

            <Grid item sm={3}>
              <Isconfirmed isConfirmed={status.isConfirmed} />
            </Grid>

            <Grid item sm={2}>
              <Typography variant="p">
                <Totalweek timeList={timeList} />
              </Typography>
            </Grid>

            <Grid item sm={1} align="right">
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
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center" justifyContent="space-between">
        <Grid item sm={1}>
          <IconButton onClick={handleOpen} sx={{ cursor: "pointer" }} aria-label="expand row" size="mdall">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Grid>

        <Grid item sm={2}>
          <Typography variant="p" fontWeight="bold">
            {item.date}
          </Typography>
        </Grid>

        <Grid item sm={3} xs={12}>
          <Typography variant="p" fontWeight="bold">
            {currentworkplace}
          </Typography>
        </Grid>

        <Grid item sm={3}>
          <STime date={item} fontWeight="bold" /> - <ETime date={item} fontWeight="bold" />
        </Grid>

        <Grid item sm={2}>
          <Totalday item={item} fontWeight="bold" />
        </Grid>

        <Grid item sm={1} align="right">
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
        <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center" justifyContent="space-between">
          <Grid item sm={1} xs={12} />

          <Grid item sm={2}>
            <SDate date={item.timeInterval.start} />
          </Grid>

          <Grid item sm={3} >
            <Typography variant="p">{work.name}</Typography>
          </Grid>

          <Grid item sm={3}>
            <Time time={item.timeInterval.start} /> - <Time time={item.timeInterval.end} />
          </Grid>

          <Grid item sm={2}>
            <Totaltimeshift item={item} />
          </Grid>

          <Grid item sm={1}>
            <Timeshiftmorebutton timeshift={item} isEmpty={isEmpty} />
          </Grid>
        </Grid>
      </Box>

      <Box hidden={!item.description} sx={{ borderTop: "1px solid", borderColor: "#e6e6ef" }}>
        <Grid container sx={{ padding: "20px 40px" }} alignItems="center">
          <Grid item md={1} xs={12} />

          <Grid item md={10}>
            <Typography variant="p" fontWeight="bold">
              {item.description}
            </Typography>
          </Grid>

          <Grid item md={1} />
        </Grid>
      </Box>

      {breaks.map((item) => {
        return <Rowbreaks item={item} isEmpty={isEmpty} key={item.id} />;
      })}
    </>
  );
};

const Rowbreaks = ({ item, isEmpty }) => {
  let reasone = breaksArr().find((breaks) => breaks.id === item.reason).name;
  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "#e6e6ef" }}>
      <Grid container spacing={2} sx={{ padding: "20px 40px" }} alignItems="center">
        <Grid item md={1} xs={12} />

        <Grid item md={2} xs={12} />

        <Grid item md={3}>
          <Typography variant="p">{reasone}</Typography>
        </Grid>

        <Grid item md={3}>
          <Time time={item.start} /> - <Time time={item.end} />
        </Grid>

        <Grid item md={2}>
          <Totalbreak item={item} />
        </Grid>

        <Grid item md={1} />
      </Grid>
    </Box>
  );
};
