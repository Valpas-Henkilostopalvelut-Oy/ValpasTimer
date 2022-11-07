import React, { useState } from "react";
import { Grid } from "@mui/material";

import { EditDescription } from "./editdescription";
import { EditWorkplaceManual } from "./editworkplace";
import { Editdate, Editstime, Edetime, Totaltime, Createtimeentry } from "./times";

export const Manual = ({ description, sel, setDescription, setSel, works }) => {
  const [date, setDate] = useState(new Date());
  const [sTime, setSTime] = useState(new Date());
  const [eTime, setETime] = useState(new Date());

  return (
    <Grid container spacing={2} display="flex" alignItems="center" justifyContent="space-around">
      <Grid item xs={12} md={6}>
        <EditDescription description={description} setDescription={setDescription} />
      </Grid>
      <Grid item xs={12} md={6}>
        <EditWorkplaceManual sel={sel} setSel={setSel} works={works} />
      </Grid>
      <Grid item xs={4} md={2.4}>
        <Editdate date={date} setDate={setDate} sTime={sTime} eTime={eTime} setSTime={setSTime} setETime={setETime} />
      </Grid>
      <Grid item xs={4} md={2.4}>
        <Editstime sTime={sTime} setSTime={setSTime} />
      </Grid>
      <Grid item xs={4} md={2.4}>
        <Edetime eTime={eTime} setETime={setETime} />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Totaltime sTime={sTime} eTime={eTime} />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Createtimeentry description={description} sel={sel} sTime={sTime} eTime={eTime} />
      </Grid>
    </Grid>
  );
};
