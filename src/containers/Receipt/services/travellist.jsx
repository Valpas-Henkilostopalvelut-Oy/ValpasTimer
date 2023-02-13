import React, { useEffect, useState } from "react";
import { DataStore, Storage } from "aws-amplify";
import { Box, Grid, Collapse, Typography, Button } from "@mui/material";
import { Worktravel } from "../../../models";
import { PropTypes } from "prop-types";

/**{
    "id": "7097cae3-d9af-47f0-b1c1-1856c45960d9",
    "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
    "created": "2023-02-13T11:26:03.766Z",
    "updated": "2023-02-13T11:26:03.766Z",
    "title": "",
    "comment": null,
    "departureDateTime": "2023-02-13T11:25:06.488Z",
    "returnDateTime": null,
    "routeCar": null,
    "attachments": [],
    "createdAt": "2023-02-13T11:26:04.588Z",
    "updatedAt": "2023-02-13T11:26:04.588Z",
    "routePoints": [
        {
            "id": "1676287555415",
            "comment": "",
            "address": "Helsinki, Finland",
            "lat": 60.16985569999999,
            "lng": 24.9383791
        },
        {
            "id": "1676287559499",
            "comment": "",
            "address": "Turku, Finland",
            "lat": 60.4518126,
            "lng": 22.2666302
        }
    ],
    "_version": 1,
    "_lastChangedAt": 1676287564609,
    "_deleted": null
} */

export const Travellist = ({ isEmpty, lang }) => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      await DataStore.query(Worktravel).then((res) => setTravels(res));
    };
    fetchTravels();
  }, [isEmpty]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4">Työmatka</Typography>
      {travels.map((travel) => {
        console.log("travel", travel);
        return <Items key={travel.id} oldTravel={travel} lang={lang} isEmpty={isEmpty} />;
      })}
    </Box>
  );
};

const Items = ({ oldTravel, lang, isEmpty }) => {
  const [travel, setTravel] = useState(oldTravel);
  const date = new Date(travel.departureDateTime).toLocaleDateString("fi-FI");
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await DataStore.delete(Worktravel, oldTravel.id);
  };

  const handleEdit = async () => {
    await DataStore.save(
      Worktravel.copyOf(travel, (updated) => {
        updated.title = "testi";
      })
    );
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "default.valpas",
        borderRadius: 1,
        p: 2,
        mt: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Typography variant="h6">{travel.title}</Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          Lähtöpäivä: {date}
        </Grid>
        <Grid item xs={12} md={2}>
          <Button fullWidth variant="outlined" onClick={() => setOpen(!open)} sx={{ borderRadius: 0 }}>
            Avaa
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">{travel.comment}</Typography>
              </Grid>
              {travel.routePoints.map((point) => {
                return <Point key={point.id} point={point} />;
              })}
              <Distance points={travel} />

              <Grid item xs={6} md={2}>
                <Button fullWidth variant="outlined">
                  Muokkaa
                </Button>
              </Grid>

              <Grid item xs={6} md={2}>
                <Button fullWidth variant="outlined" onClick={handleDelete} color="error">
                  Poista
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
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

const Distance = ({ points }) => {
  const [distance, setDistance] = useState("");

  useEffect(() => {
    calc(points, setDistance);
  }, [points]);

  return (
    <Grid item xs={12}>
      <Typography variant="body1">Matka: {distance}</Typography>
    </Grid>
  );
};

const Point = ({ point }) => {
  return (
    <Grid item xs={12}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">{point.address}</Typography>
      </Box>
    </Grid>
  );
};
