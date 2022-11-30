import React, { useState } from "react";
import { Grid, Typography, Box, Collapse } from "@mui/material";
import { totalweektime } from "./totaltime";
import { Row } from "./row";

export const HistoryRow = ({ grouped, lang, works, isEmpty }) => {
  return grouped.map((week) => <CollapseRow key={week.week} week={week} lang={lang} works={works} isEmpty={isEmpty} />);
};

const CollapseRow = ({ week, lang, works, isEmpty }) => {
  const [open, setOpen] = useState(false);
  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "background.paper",
            justifyContent: "space-between",
            marginTop: 1,
          }}
          onClick={() => setOpen(!open)}
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
              {lang.history.total_time} {totalweektime(week).h}:{totalweektime(week).min}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {week.period}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Row week={week} lang={lang} isEmpty={isEmpty} works={works} />
        </Collapse>
      </Grid>
    </Grid>
  );
};
