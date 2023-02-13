import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, InputBase, Typography, Button, Autocomplete, Tooltip, IconButton } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataStore, Auth } from "aws-amplify";
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
  const [searchAddres, setSearchAddres] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
    if (searchAddres.length > 0) {
      const request = {
        query: searchAddres,
        fields: ["formatted_address", "geometry"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === "OK") {
          setPlaces(results);
        }
      });
    }
  }, [searchAddres]);

  return (
    <Grid container spacing={2} item xs={12}>
      <Grid item xs={12} md={6}>
        <Autocomplete
          inputValue={searchAddres}
          onInputChange={(e, value) => {
            setSearchAddres(value);
          }}
          disabled={!isEmpty}
          options={places}
          getOptionLabel={(option) => {
            return option.formatted_address;
          }}
          isOptionEqualToValue={(option, val) => option.formatted_address === val.formatted_address}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Address"
              InputProps={{
                ...params.InputProps,
                endAdornment: <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>,
              }}
            />
          )}
          onChange={(e, value) => {
            if (value) {
              setTravel({
                ...travel,
                routePoints: travel.routePoints.map((p) => {
                  if (p.id === point.id) {
                    return {
                      ...p,
                      address: value.formatted_address,
                      lat: value.geometry.location.lat(),
                      lng: value.geometry.location.lng(),
                    };
                  } else {
                    return p;
                  }
                }),
              });
            }
          }}
        />
      </Grid>

      <Grid item xs={12} md={5}>
        <TextField
          disabled={!isEmpty}
          fullWidth
          label="Comment"
          value={point.comment}
          onChange={(e) => {
            setTravel({
              ...travel,
              routePoints: travel.routePoints.map((p) => {
                if (p.id === point.id) {
                  return {
                    ...p,
                    comment: e.target.value,
                  };
                } else {
                  return p;
                }
              }),
            });
          }}
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <IconButton
          disabled={!isEmpty}
          onClick={() => {
            setTravel({
              ...travel,
              routePoints: travel.routePoints.filter((p) => p.id !== point.id),
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const calc = (travel, setDistance) => {
  const lat1 = travel.routePoints[0].lat;
  const lng1 = travel.routePoints[0].lng;
  const lat2 = travel.routePoints[1].lat;
  const lng2 = travel.routePoints[1].lng;

  const directionsService = new window.google.maps.DirectionsService();

  const request = {
    origin: { lat: lat1, lng: lng1 },
    destination: { lat: lat2, lng: lng2 },
    travelMode: window.google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") setDistance(result.routes[0].legs[0].distance.text);
  });
};

const Route = ({ travel, setTravel, isEmpty }) => {
  const [distance, setDistance] = useState("");

  useEffect(() => {
    if (travel.routePoints.length === 2) {
      calc(travel, setDistance);
    } else {
      setDistance("");
    }
  }, [travel.routePoints]);

  const addPoint = () => {
    setTravel({
      ...travel,
      routePoints: [
        ...travel.routePoints,
        {
          id: Date.now(),
          comment: "",
          address: "",
          lat: null,
          lng: null,
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
          <Typography variant="h6">Distance: {distance}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" disabled={!isEmpty} onClick={addPoint} fullWidth>
            Add route point
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const savetravel = async (travel) => {
  await Auth.currentAuthenticatedUser()
    .then(async (user) => {
      await DataStore.save(
        new Worktravel({
          userId: user.attributes.sub,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          title: travel.description,
          comment: null,
          departureDateTime: travel.departureDate,
          returnDateTime: travel.returnDate,
          routeCar: null,
          routePoints: travel.routePoints.map((p) => {
            return {
              id: p.id,
              address: p.address,
              lat: p.lat,
              lng: p.lng,
              comment: p.comment,
            };
          }),
          attachments: [],
        })
      );
    })
    .catch((err) => console.warn(err));
};

const Save = ({ travel, isEmpty, clear }) => {
  const handleSave = () => savetravel(travel).then(() => clear());

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
        <Grid item xs={2}>
          <Button variant="outlined" disabled={!isEmpty} onClick={handleSave} fullWidth>
            Save
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
      <Save travel={travel} isEmpty={isEmpty} clear={cancel} />
    </Box>
  );
};
