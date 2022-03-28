import React, { useState } from "react";
import { TextField, Box, Grid, Button, Typography } from "@mui/material";
import { Formik } from "formik";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import fi from "date-fns/locale/fi";
import { DatePicker, TimePicker } from "@mui/lab";

const AddTime = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  return (
    <Box
      component="form"
      sx={{
        maxWidth: "100%",
        marginBottom: "20px",
        marginTop: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid container item spacing={3} alignItems="center">
          <Grid item md={9}>
            <TextField
              variant="standard"
              fullWidth
              placeholder="Description"
              value={description}
              onChange={setDescription}
            />
          </Grid>

          <Grid item md={3}>
            <Button fullWidth variant="contained" onClick={() => {
              console.log(start);
              console.warn(end);
              console.log(date);
              console.warn(description);
            }}>
              Add time
            </Button>
          </Grid>
        </Grid>
        <Grid container item alignItems="center">
          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
              <TimePicker
                label="time"
                value={start}
                onChange={setStart}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
              <TimePicker
                label="time"
                value={end}
                onChange={setEnd}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item md={3}>
            <Typography>Sumary</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTime;
