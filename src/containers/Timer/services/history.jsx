import React, { useState } from "react";
import { Grid, Typography, Box, Collapse, IconButton } from "@mui/material";
import { totalweektime } from "./totaltime";
import { Row } from "./row";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// eslint-disable-next-line no-unused-vars
const isSent = (data) => {
  var arr = data.arr;

  arr.forEach((day) => {
    let isSent = day.arr.filter((item) => item.isSent).length;
    let notSent = day.arr.length;

    return isSent === notSent;
  });
};

export const HistoryRow = ({ grouped, lang, works, isEmpty }) => {
  return grouped.map((week) => <CollapseRow key={week.week} week={week} lang={lang} works={works} isEmpty={isEmpty} />);
};

const CollapseRow = ({ week, lang, works, isEmpty }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            cursor: "pointer",
            display: "flex",
            backgroundColor: "background.paper",
            justifyContent: "space-between",
            marginTop: 1,
            alignItems: "center",
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
              {lang.history.total_time}{" "}
              {totalweektime(week).h > 9 ? totalweektime(week).h : "0" + totalweektime(week).h}:
              {totalweektime(week).min > 9 ? totalweektime(week).min : "0" + totalweektime(week).min}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {week.period}
            </Typography>
          </Box>

          <Box padding={2}>
            <IconButton>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box mb="20px" mr="5px" ml="5px">
            <Row week={week} lang={lang} isEmpty={isEmpty} works={works} />
          </Box>
        </Collapse>
      </Grid>
    </Grid>
  );
};
