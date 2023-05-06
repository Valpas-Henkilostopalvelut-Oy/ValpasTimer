import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";

const Title = ({ travel, setTravel, isEmpty }) => {
  return (
    <TextField
      disabled={!isEmpty}
      fullWidth
      label="Title"
      value={travel.title}
      onChange={(e) => setTravel({ ...travel, title: e.target.value })}
    />
  );
};

const Departuredate = ({ travel, setTravel, isEmpty }) => {
  const handleDateChange = (value) => {
    setTravel({ ...travel, departureDate: value });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        disabled={!isEmpty}
        disableMaskedInput
        label="Departure date"
        value={travel.departureDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
};

const Returndate = ({ travel, setTravel, isEmpty }) => {
  const handleDateChange = (value) => {
    setTravel({ ...travel, returnDate: value });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        disabled={!isEmpty}
        disableMaskedInput
        label="Return date"
        value={travel.returnDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
};

const Comment = ({ travel, setTravel, isEmpty }) => {
  return (
    <TextField
      disabled={!isEmpty}
      fullWidth
      multiline
      rows={5}
      label="Comment"
      value={travel.comment}
      onChange={(e) => setTravel({ ...travel, comment: e.target.value })}
    />
  );
};

export const Basic = (props) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.500",
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      <Typography variant="h6">Basic information</Typography>
      <Grid container spacing={2}>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={12}>
            <Title {...props} />
          </Grid>
          <Grid item xs={12}>
            <Departuredate {...props} />
          </Grid>
          <Grid item xs={12}>
            <Returndate {...props} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Comment {...props} />
        </Grid>
      </Grid>
    </Box>
  );
};
