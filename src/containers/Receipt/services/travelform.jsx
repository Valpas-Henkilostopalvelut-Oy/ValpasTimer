import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, InputBase, Typography, Button, Autocomplete } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataStore } from "aws-amplify";
import { Worktravel } from "../../../models";

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

const Point = ({ point, travel, setTravel, isEmpty, lang }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
    if (query.length > 0) {
      const request = {
        query: query,
        fields: ["formatted_address", "geometry"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [query]);

  return (
    <Grid container spacing={2} item xs={12}>
      <Grid item xs={12} md={6}>
        <Autocomplete
          disabled={!isEmpty}
          options={places}
          getOptionLabel={(option) => option.formatted_address}
          inputValue={query}
          isOptionEqualToValue={(option, value) => option.formatted_address === value.formatted_address}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Address"
              value={point.address}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          )}
          onChange={(e, value) => {
            setQuery(value.formatted_address);
          }}
        />
      </Grid>
    </Grid>
  );
};

const Route = ({ travel, setTravel, isEmpty }) => {
  const [points, setPoints] = useState([]);

  const geocoder = new window.google.maps.Geocoder();

  const calc = () => {
    geocoder.geocode({ address: "" }, (results, status) => {
      console.log(results);
      if (status === "OK") {
        const lat1 = results[0].geometry.location.lat();
        const lng1 = results[0].geometry.location.lng();
        geocoder.geocode({ address: "" }, (results, status) => {
          console.log(results);
          if (status === "OK") {
            const directionsService = new window.google.maps.DirectionsService();
            const lat2 = results[0].geometry.location.lat();
            const lng2 = results[0].geometry.location.lng();

            const request = {
              origin: { lat: lat1, lng: lng1 },
              destination: { lat: lat2, lng: lng2 },
              travelMode: window.google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (result, status) => {
              if (status === "OK") {
                console.log(result.routes[0].legs[0].distance.value);
              }
            });
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const addPoint = () => {
    setTravel({
      ...travel,
      routePoints: [
        ...travel.routePoints,
        {
          id: Date.now(),
          comment: "",
          address: "",
          lat: 0,
          lng: 0,
        },
      ],
    });
  };

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Route</Typography>
        </Grid>
        {travel.routePoints.map((point) => {
          return <Point key={point.id} point={point} travel={travel} setTravel={setTravel} isEmpty={isEmpty} />;
        })}
        <Grid item xs={12}>
          <Button variant="contained" disabled={!isEmpty} onClick={addPoint}>
            Add route point
          </Button>
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
