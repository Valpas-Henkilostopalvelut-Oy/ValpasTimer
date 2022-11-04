import React, { useEffect, useState, Fragment } from "react";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials, TimeEntry, Break, AllWorkSpaces } from "../../../../models";
import { Grid, Typography } from "@mui/material";

import { TextToTime } from "../../../../services/time.jsx";
import { EditDescription } from "./editdescription";

export const Manual = ({ description, sel, setDescription, setSel, works, isStarted, setStarted }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <EditDescription description={description} setDescription={setDescription} />
      </Grid>
    </Grid>
  );
};
