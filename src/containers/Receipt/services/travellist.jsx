import React, { useEffect, useState } from "react";
import { DataStore, Storage } from "aws-amplify";
import { Box, Grid, Collapse, Typography, Button } from "@mui/material";
import { Worktravel } from "../../../models";
import { PropTypes } from "prop-types";

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
      {travels.map((travel) => (
        <Items key={travel.id} oldTravel={travel} lang={lang} isEmpty={isEmpty} />
      ))}
    </Box>
  );
};

const Items = ({ oldTravel, lang, isEmpty }) => {
  console.log("oldTravel", oldTravel);

  return;
};
