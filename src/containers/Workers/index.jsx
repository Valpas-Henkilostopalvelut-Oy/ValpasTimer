import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import TopBar from "./services/topbar";
import Userlist from "./services/userlist";
import { Auth, API, Hub } from "aws-amplify";
import AWS from "aws-sdk";

const Workers = (props) => {
  const [users, setUsers] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
        setIsEmpty(data.isEmpty);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiName = "AdminQueries";
        const path = "/ListUsers";
        const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
        const headers = { "Content-Type": "application/json", Authorization: token };
        const { Users } = await API.get(apiName, path, { headers });

        setUsers(Users);
      } catch (error) {
        console.error(error);
      }
    };

    !isEmpty && fetchData();
  }, [isEmpty]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Työntekijät</Typography>
        </Grid>

        <Grid item xs={12}>
          <TopBar />
        </Grid>

        <Userlist users={users} isEmpty={isEmpty} />
      </Grid>
    </Container>
  );
};

export default Workers;
