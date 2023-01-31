import React, { useState } from "react";
import { Box, Grid, TextField, InputBase, Typography } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disabled={!isEmpty}
        disableMaskedInput
        label="Departure date"
        value={travel.departureDate}
        onChange={handleDateChange}
        renderInput={(params) => {
          return <TextField {...params} fullWidth />;
        }}
      />
    </LocalizationProvider>
  );
};

const Returndate = ({ travel, setTravel, isEmpty }) => {
  const handleDateChange = (value) => {
    setTravel({ ...travel, returnDate: value });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        disabled={!isEmpty}
        disableMaskedInput
        label="Return date"
        value={travel.returnDate}
        onChange={handleDateChange}
        renderInput={(params) => {
          return <TextField {...params} fullWidth />;
        }}
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

const Basic = ({ travel, setTravel, isEmpty }) => {
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
            <Title travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
          </Grid>
          <Grid item xs={12}>
            <Departuredate travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
          </Grid>
          <Grid item xs={12}>
            <Returndate travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Comment travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
        </Grid>
      </Grid>
    </Box>
  );
};

const Route = ({ travel, setTravel, isEmpty }) => {
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
      <Typography variant="h6">Route</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputBase
            disabled={!isEmpty}
            fullWidth
            multiline
            rows={5}
            value={travel.route}
            onChange={(e) => setTravel({ ...travel, route: e.target.value })}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const Attachments = ({ travel, setTravel, isEmpty }) => {
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
      <Typography variant="h6">Attachments</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputBase
            disabled={!isEmpty}
            fullWidth
            multiline
            rows={5}
            value={travel.attachments}
            onChange={(e) => setTravel({ ...travel, attachments: e.target.value })}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const Travelform = ({ isEmpty, setSelectedIndex }) => {
  const [travel, setTravel] = useState({
    title: "",
    description: "",
    departureDate: new Date(),
    returnDate: null,
    routePoints: [],
    route: "",
  });

  const cancel = () => {
    setTravel({
      title: "",
      description: "",
      departureDate: new Date(),
      returnDate: null,
      routePoints: [],
      route: "",
    });
    setSelectedIndex(null);
  };
  return (
    <Box sx={{ mt: 2 }}>
      <Basic travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
      <Route travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
      <Attachments travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
    </Box>
  );
};
