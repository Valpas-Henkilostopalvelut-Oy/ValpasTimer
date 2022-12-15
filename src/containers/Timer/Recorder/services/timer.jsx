import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import { EditStartTime } from "./editstartedtime";
import { EditDescriptionTimer } from "./editdescription";
import { EditWorkplaceTimer } from "./editworkplace";
import { StartTimer } from "./starttimer";
import { PropTypes } from "prop-types";
import { Timerbreak } from "./breaks";

export const Timer = ({
  time,
  timerTime,
  setTime,
  setTimer,
  description,
  sel,
  setDescription,
  setSel,
  works,
  isStarted,
  setStarted,
  lang,
  isEmpty,
  isPaused,
  setIsPaused,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4}>
        <EditDescriptionTimer
          description={description}
          setDescription={setDescription}
          data={timerTime}
          isStarted={isStarted}
          lang={lang}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EditWorkplaceTimer
          sel={sel}
          setSel={setSel}
          works={works}
          data={timerTime}
          isStarted={isStarted}
          lang={lang}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Typography
          variant="h5"
          align="center"
          onClick={() => {
            isStarted && setOpen(true);
          }}
          sx={{
            [isStarted ? "&:hover" : ""]: {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          {time.hours < 10 ? "0" + time.hours : time.hours}:{time.minutes < 10 ? "0" + time.minutes : time.minutes}:
          {time.seconds < 10 ? "0" + time.seconds : time.seconds}
        </Typography>
        {timerTime && isStarted && <EditStartTime open={open} setOpen={setOpen} timerTime={timerTime} lang={lang} />}
      </Grid>
      <Grid item xs={3} md={1}>
        <Timerbreak
          data={timerTime}
          isEmpty={isEmpty}
          disabled={!(timerTime && isStarted)}
          setTimer={setTimer}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </Grid>
      <Grid item xs={3} md={1}>
        <StartTimer
          description={description}
          workplace={sel}
          isStarted={isStarted}
          setStarted={setStarted}
          setTimer={setTimer}
          setTime={setTime}
          lang={lang}
          setIsPaused={setIsPaused}
        />
      </Grid>
    </Grid>
  );
};

Timer.propTypes = {
  description: PropTypes.string,
  sel: PropTypes.string,
  setDescription: PropTypes.func,
  setSel: PropTypes.func,
  works: PropTypes.array,
  isStarted: PropTypes.bool,
  setStarted: PropTypes.func,
  lang: PropTypes.object,
};
