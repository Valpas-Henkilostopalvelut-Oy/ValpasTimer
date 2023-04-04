import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import { EditStartTime } from "./editstartedtime.jsx";
import { EditDescriptionTimer } from "./editdescription.jsx";
import { EditWorkplaceTimer } from "./editworkplace.jsx";
import { StartTimer } from "./starttimer.jsx";
import { PropTypes } from "prop-types";
import { Timerbreak } from "./breaks.jsx";
import { EditWorkitemTimer } from "./editworkitem.jsx";

export const Timer = (props) => {
  const { timerTime, isStarted } = props;

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={6} md={4}>
        <EditWorkplaceTimer {...props} />
      </Grid>

      <Grid item xs={6} md={4}>
        <EditWorkitemTimer {...props} />
      </Grid>

      <Grid item xs={3} md={1} textAlign="center">
        <StartTimer {...props} />
      </Grid>

      <Grid item xs={3} md={1} textAlign="center">
        <Timerbreak disabled={!(timerTime && isStarted)} {...props} />
      </Grid>

      <Grid item xs={6} md={2}>
        <EditStartTime {...props} />
      </Grid>

      <Grid item xs={12}>
        <EditDescriptionTimer {...props} />
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
