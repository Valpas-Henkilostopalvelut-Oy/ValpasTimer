import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { totaldaytime, totalweektime } from "./totaltime";
import { Details } from "./table.jsx";
import { Reportallweek } from "./buttons.jsx";

export const WeekRow = ({ grouped, lang, works, isEmpty }) => {
  return grouped.map((week) => (
    <Grid container item spacing={2} key={week.week}>
      <Grid item xs={12}>
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
              {lang.history.total_time}{" "}
              {totalweektime(week).h > 9 ? totalweektime(week).h : "0" + totalweektime(week).h}:
              {totalweektime(week).min > 9 ? totalweektime(week).min : "0" + totalweektime(week).min}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {week.period}
            </Typography>
          </Box>
          <Reportallweek date={week} isEmpty={isEmpty} lang={lang.history} />
        </Box>
      </Grid>

      <Row week={week} lang={lang} isEmpty={isEmpty} works={works} />
    </Grid>
  ));
};

export const Row = ({ week, lang, works, isEmpty }) => {
  return (
    week &&
    week.arr.map((date) => (
      <Grid container item xs={12} key={date.date}>
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "1px",
              backgroundColor: "background.paper",
              marginBottom: "15px",
              marginTop: "15px",
              padding: 1,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {date.date}
            </Typography>
            <Typography variant="p" color="text.secondary">
              {lang.history.total_time} {totaldaytime(date).h > 9 ? totaldaytime(date).h : "0" + totaldaytime(date).h}:
              {totaldaytime(date).min > 9 ? totaldaytime(date).min : "0" + totaldaytime(date).min}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Details date={date} workplaces={works} lang={lang.history} isEmpty={isEmpty} />
        </Grid>
      </Grid>
    ))
  );
};
