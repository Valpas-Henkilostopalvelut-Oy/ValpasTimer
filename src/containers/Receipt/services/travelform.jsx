import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { DataStore, Auth } from "aws-amplify";
import { Worktravel, Receipt } from "../../../models";
import { Route } from "./travelroute";
import { Basic } from "./travelformbasic";
import { Attachments } from "./travelattachreceipt";

const savetravel = async (travel) => {
  await Auth.currentAuthenticatedUser()
    .then(async (user) => {
      await DataStore.save(
        new Worktravel({
          userId: user.attributes.sub,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          title: travel.title,
          comment: travel.comment,
          departureDateTime: travel.departureDate ? new Date(travel.departureDate).toISOString() : null,
          returnDateTime: travel.returnDate ? new Date(travel.returnDate).toISOString() : null,
          routeCar: null,
          routePoints: travel.routePoints.map((p) => {
            return {
              id: String(p.id),
              address: p.address,
              lat: p.lat,
              lng: p.lng,
              comment: p.comment,
            };
          }),
          attachments: travel.attachments,
        })
      ).then((savedtravel) => {
        savedtravel.attachments.forEach(async (a) => {
          await DataStore.query(Receipt, a.id).then(async (receipt) => {
            await DataStore.save(
              Receipt.copyOf(receipt, (updated) => {
                updated.isTravel = true;
              })
            );
          });
        });
      });
    })
    .catch((err) => console.warn(err));
};

const Save = ({ travel, isEmpty, clear, disabled }) => {
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
        <Grid item sm={2} xs={6}>
          <Button variant="outlined" disabled={!isEmpty || disabled} onClick={handleSave} fullWidth>
            Talenna
          </Button>
        </Grid>
        <Grid item sm={2} xs={6}>
          <Button variant="outlined" disabled={!isEmpty} onClick={clear} fullWidth>
            Perutta
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const travelTemp = {
  title: "",
  description: "",
  departureDate: new Date(),
  returnDate: null,
  routePoints: [],
  route: "",
  attachments: [],
};

export const Travelform = ({ isEmpty, setSelectedIndex }) => {
  const [travel, setTravel] = useState(travelTemp);

  const cancel = () => {
    setTravel(travelTemp);
    setSelectedIndex(null);
  };
  return (
    <Box sx={{ mt: 2 }}>
      <Basic travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
      <Route travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
      <Attachments travel={travel} setTravel={setTravel} isEmpty={isEmpty} />
      <Save
        travel={travel}
        isEmpty={isEmpty}
        clear={cancel}
        disabled={travel.title === "" || travel.routePoints.length < 2}
      />
    </Box>
  );
};
