import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, InputBase, Typography, Button, Tooltip, IconButton } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataStore, Auth } from "aws-amplify";
import { Worktravel } from "../../../models";
import fi from "date-fns/locale/fi";

const calc = (point1, point2) => {
  //use Promise to return the result
  return new Promise((resolve, reject) => {
    const lat1 = point1.lat;
    const lng1 = point1.lng;
    const lat2 = point2.lat;
    const lng2 = point2.lng;

    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin: { lat: lat1, lng: lng1 },
      destination: { lat: lat2, lng: lng2 },
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const distancetext = result.routes[0].legs[0].distance.text;
        const distance = result.routes[0].legs[0].distance.value;
        resolve({ distancetext, distance });
      } else {
        reject("error");
      }
    });
  });
};

export const Route = (props) => {
  const { travel, setTravel, isEmpty } = props;
  const [distance, setDistance] = useState("");

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
        {travel.routePoints.map((point, i) => {
          return (
            <Point key={point.id} index={i} point={point} travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
          );
        })}

        <Grid item xs={12}>
          <Button variant="outlined" disabled={!isEmpty} onClick={addPoint} fullWidth>
            Add route point
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const Point = (props) => {
  const { point, travel, setTravel, isEmpty, index } = props;
  const [searchAddres, setSearchAddres] = useState("");
  const [places, setPlaces] = useState([]);
  const [distance, setDistance] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  //if not first point, calculate distance
  if (index > 0) {
    const point1 = travel.routePoints[index - 1];
    const point2 = travel.routePoints[index];
    if (point1.lat && point2.lat) {
      calc(point1, point2).then((result) => {
        setDistance(result.distancetext);
      });
    }
  }

  useEffect(() => {
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
    if (searchAddres.length > 3 && !isSelected) {
      service.findPlaceFromQuery(
        { query: searchAddres, fields: ["formatted_address", "geometry"] },
        (results, status) =>
          status === window.google.maps.places.PlacesServiceStatus.OK && setPlaces(results.slice(0, 5))
      );
    } else {
      setPlaces([]);
    }
  }, [searchAddres]);

  const handleSelect = (place) => {
    const newPoint = {
      ...point,
      address: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    const newRoutePoints = travel.routePoints.map((p) => (p.id === point.id ? newPoint : p));
    setIsSelected(true);
    setTravel({ ...travel, routePoints: newRoutePoints });
    setPlaces([]);
    setSearchAddres(place.formatted_address);
  };

  const handleDelete = () => {
    const newRoutePoints = travel.routePoints.filter((p) => p.id !== point.id);
    setTravel({ ...travel, routePoints: newRoutePoints });
  };

  const handleSearch = (e) => {
    setSearchAddres(e.target.value);
    setIsSelected(false);
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">{distance}</Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField disabled={!isEmpty} fullWidth label="Address" value={searchAddres} onChange={handleSearch} />
          {places.map((place) => (
            <div key={place.id} onClick={() => handleSelect(place)}>
              {place.formatted_address}
            </div>
          ))}
        </Grid>
        <Grid item sm={5} xs={10}>
          <TextField
            disabled={!isEmpty}
            fullWidth
            label="Comment"
            value={point.comment}
            onChange={(e) => {
              const newPoint = { ...point, comment: e.target.value };
              const newRoutePoints = travel.routePoints.map((p) => (p.id === point.id ? newPoint : p));
              setTravel({ ...travel, routePoints: newRoutePoints });
            }}
          />
        </Grid>
        <Grid item sm={1} xs={2}>
          <Tooltip title="Delete">
            <IconButton disabled={!isEmpty} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
