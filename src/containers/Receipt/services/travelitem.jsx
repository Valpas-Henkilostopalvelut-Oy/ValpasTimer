import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  InputBase,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import { DataStore, Storage, Auth } from "aws-amplify";
import { Worktravel, Receipt } from "../../../models";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";
import DeleteIcon from "@mui/icons-material/Delete";

const deleteTravel = async (travel) => {
  travel = await DataStore.query(Worktravel, travel.id);
  const receipts = travel.attachments;
  await DataStore.delete(travel).then(async () => {
    receipts.forEach(async (r) => {
      await DataStore.query(Receipt, r.receiptId).then(async (receipt) => {
        await DataStore.save(
          Receipt.copyOf(receipt, (updated) => {
            updated.isTravel = false;
          })
        );
      });
    });
  });
};

export const Travelitem = (props) => {
  const { oldTravel } = props;
  const [edit, setEdit] = useState(false);
  const [travel, setTravel] = useState(oldTravel);
  const date = new Date(travel.departureDateTime).toLocaleDateString("fi-FI");
  const [open, setOpen] = useState(false);

  const handleEdit = () => setEdit(!edit);
  const handleDelete = () => deleteTravel(travel);

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
              <Traveldetails travel={travel} edit={edit} setTravel={setTravel} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Travelreceipts travel={travel} receipts={travel.attachments} edit={edit} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth variant="outlined" onClick={handleEdit} sx={{ borderRadius: 0 }}>
                {edit ? "Tallenna" : "Muokkaa"}
              </Button>
            </Grid>
            <Grid item xs={12} md={6} onClick={handleDelete}>
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

const Leavedate = (props) => {
  const { travel, edit, setTravel } = props;
  const [date, setDate] = useState(new Date(travel.departureDateTime));
  let departure = new Date(date).toLocaleDateString("fi-FI");

  if (edit) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <DatePicker
          label="Lähtöpäivä"
          value={date}
          disableMaskedInput
          onChange={(newValue) => {
            setDate(newValue);
            setTravel({ ...travel, departureDateTime: newValue });
          }}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </LocalizationProvider>
    );
  } else {
    return <Typography variant="span">{departure}</Typography>;
  }
};

const Returndate = (props) => {
  const { travel, edit, setTravel } = props;
  const [date, setDate] = useState(new Date(travel.returnDateTime));
  let returndate = travel.returnDateTime ? new Date(date).toLocaleDateString("fi-FI") : "Ei paluuta";

  if (edit) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <DatePicker
          label="Paluupäivä"
          value={date}
          disableMaskedInput
          onChange={(newValue) => {
            setDate(newValue);
            setTravel({ ...travel, returnDateTime: newValue });
          }}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </LocalizationProvider>
    );
  } else {
    return <Typography variant="span">{returndate}</Typography>;
  }
};

const RenderRoutes = (props) => {
  const { routes, setRoutes, travel, edit, setTravel } = props;
  const points = travel.routePoints;

  /**
   * point: {
    "id": "1676627921394",
    "comment": "",
    "address": "Turku, Finland",
    "lat": 60.4518126,
    "lng": 22.2666302
}
   */

  if (edit) {
    return (
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="span">Reitti</Typography>
            </TableCell>

            <TableCell>
              <Typography variant="span">Poista</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {points.map((point, index) => (
            <RoutesPoint {...props} index={index} key={index} point={point} />
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return (
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {routes.map((route, index) => {
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
          })}
        </TableBody>
      </Table>
    );
  }
};

const RoutesPoint = (props) => {
  const { travel, setTravel, index, point } = props;
  const [distance, setDistance] = useState("");

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

  const handleDeletepoint = () => {
    let newPoints = travel.routePoints;
    newPoints.splice(index, 1);
    setTravel({ ...travel, routePoints: newPoints });
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="span">{point.address}</Typography>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleDeletepoint}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const Travelcomments = (props) => {
  const { travel, edit, setTravel } = props;
  const [comment, setComment] = useState(travel.comment);

  if (edit) {
    return (
      <TextField
        label="Kommentti"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          setTravel({ ...travel, comment: e.target.value });
        }}
        variant="standard"
      />
    );
  } else {
    return <Typography variant="span">{comment}</Typography>;
  }
};

const Traveldetails = (props) => {
  const { travel } = props;
  let created = new Date(travel.created).toLocaleDateString("fi-FI");
  let modified = new Date(travel.updated).toLocaleDateString("fi-FI");

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
            <TableCell colSpan={2}>
              <Leavedate {...props} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paluupäivä</TableCell>
            <TableCell colSpan={2}>
              <Returndate {...props} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reitti</TableCell>
            <TableCell colSpan={2}>
              <RenderRoutes {...props} routes={routes} setRoutes={setRoutes} />
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
            <TableCell colSpan={2}>
              <Travelcomments {...props} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
