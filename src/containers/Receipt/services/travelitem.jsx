import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Grid,
  Typography,
  Collapse,
} from "@mui/material";

export const Travelitem = (props) => {
  const { oldTravel } = props;
  const [edit, setEdit] = useState(false);
  const [travel, setTravel] = useState(oldTravel);
  const date = new Date(travel.departureDateTime).toLocaleDateString("fi-FI");
  const [open, setOpen] = useState(false);

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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} md={8}>
          <Typography variant="h6">{travel.title}</Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6">Lähtöpäivä: {date}</Typography>
        </Grid>
        <Grid item xs={12} md={1}>
          <Button fullWidth variant="outlined" onClick={() => setOpen(!open)} sx={{ borderRadius: 0 }}>
            {open ? "Piilota" : "Näytä"}
          </Button>
        </Grid>
      </Grid>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Traveldetails travel={travel} edit={edit} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Travelreceipts travel={travel} receipts={travel.attachments} edit={edit} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant="outlined" onClick={() => setEdit(!edit)} sx={{ borderRadius: 0 }}>
                {edit ? "Tallenna" : "Muokkaa"}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant="outlined" sx={{ borderRadius: 0 }} color="error">
                Poista
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
};

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

const Travelreceipts = (props) => {
  const { receipts, edit } = props;

  return (
    <Box sx={{ border: 1, borderColor: "default.valpas", borderRadius: 1, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">Kulut</Typography>
        </Grid>
        {receipts.map((receipt) => (
          <Grid item xs={12} key={receipt.id}>
            <Travelreceiptitem receipt={receipt} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Travelreceiptitem = (props) => {
  const { receipt } = props;
  /**
   * receipt: {
        "id": "1676546517526",
        "receiptId": "d826fce5-753c-448b-8d0e-7d740ffd21c6",
        "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
        "placeOfPurchase": "",
        "dateOfPurchase": "2023-02-13T10:55:19.793Z",
        "price": 0,
        "currency": "EUR",
        "tax": 0.24,
        "isTravel": null
    }
   */
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  let date = new Date(receipt.dateOfPurchase).toLocaleDateString("fi-FI");
  let price = `${receipt.price} ${receipt.currency} (alv ${receipt.tax * 100}%)`;
  let place = receipt.placeOfPurchase ? receipt.placeOfPurchase : "Ei paikkaa";

  return (
    <Box sx={{ border: 1, borderColor: "default.valpas", borderRadius: 1, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography variant="span">{date}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="span">{place}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="span">{price}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Traveldetails = (props) => {
  const { travel, edit } = props;
  let created = new Date(travel.created).toLocaleDateString("fi-FI");
  let modified = new Date(travel.updated).toLocaleDateString("fi-FI");
  let departure = new Date(travel.departureDateTime).toLocaleDateString("fi-FI");
  let returnDate = travel.returnDateTime ? new Date(travel.returnDateTime).toLocaleDateString("fi-FI") : "";
  const [routes, setRoutes] = useState([]); //[{trip: Turku-Helsinki, distance: 100km}, {trip: Helsinki-Turku, distance: 100km}]

  useEffect(() => {
    const getRoutes = async () => {
      const routePoints = travel.routePoints;
      const routeArray = [];
      for (let i = 0; i < routePoints.length - 1; i++) {
        const point1 = routePoints[i];
        const point2 = routePoints[i + 1];
        const distance = await calc(point1, point2).catch((err) => console.warn(err));
        const trip = `${point1.address} - ${point2.address}`;
        routeArray.push({ trip, distance });
      }
      setRoutes(routeArray);
    };
    getRoutes();
  }, [travel]);

  const renderRoutes = () => {
    return routes.map((route, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <Typography variant="span">{route.trip}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="span">{route.distance.distancetext}</Typography>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell width={"40%"}>Matka lisätietoa</TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>Luotu</TableCell>
            <TableCell colSpan={2}>{created}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Muokattu</TableCell>
            <TableCell colSpan={2}>{modified}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lähtöpäivä</TableCell>
            <TableCell colSpan={2}>{departure}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paluupäivä</TableCell>
            <TableCell colSpan={2}>{returnDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reitti</TableCell>
            <TableCell colSpan={2}>
              <Table size="small" aria-label="a dense table">
                <TableBody>{renderRoutes()}</TableBody>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Koko Matka</TableCell>
            <TableCell colSpan={2}>
              {(
                routes.reduce((acc, route) => {
                  return acc + route.distance.distance;
                }, 0) / 1000
              ).toFixed(2)}{" "}
              km
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kommentti</TableCell>
            <TableCell colSpan={2}>{travel.comment}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
