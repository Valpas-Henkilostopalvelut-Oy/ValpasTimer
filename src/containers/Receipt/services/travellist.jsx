import React, { useEffect, useState } from "react";
import { DataStore, Storage, Auth } from "aws-amplify";
import { Box, Grid, Collapse, Typography, Button } from "@mui/material";
import { Worktravel } from "../../../models";
import { PropTypes } from "prop-types";
import { Travelitem } from "./travelitem";

export const Travellist = (props) => {
  const [travels, setTravels] = useState([]);
  const { workerdata, isEmpty } = props;

  useEffect(() => {
    const fetchTravels = async () => {
      const user = await Auth.currentAuthenticatedUser();
      await DataStore.query(Worktravel).then((res) =>
        setTravels(
          res.filter((travel) =>
            workerdata ? travel.userId === workerdata.userId : user.attributes.sub === travel.userId
          )
        )
      );
    };
    fetchTravels();
  }, [isEmpty, workerdata]);

  return (
    <Box sx={{ mt: 2 }}>
      {travels.length !== 0 ? (
        travels.map((travel) => <Travelitem key={travel.id} oldTravel={travel} {...props} />)
      ) : (
        <Typography variant="h4">Ei työmatkoja</Typography>
      )}
    </Box>
  );
};
