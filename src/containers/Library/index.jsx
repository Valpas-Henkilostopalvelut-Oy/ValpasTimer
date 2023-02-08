import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Checkbox, CircularProgress } from "@mui/material";
import { sortData } from "./services/datasort.jsx";
import { DataStore, Hub } from "aws-amplify";
import { TimeEntry, AllWorkSpaces } from "../../models/index.js";
import { Row } from "./services/row.jsx";
import { totalworkplacetime } from "./services/timecalc";
import { Filter } from "./services/datafilter.jsx";
import { AddTimeShift } from "./services/addtimeshit.jsx";
import { Pdf } from "./services/pdf.jsx";
import { UserCredentials } from "../../models/index.js";

export const Library = () => {
  const [data, setData] = useState(null);
  const [works, setWorks] = useState(null);
  const [worker, setWorker] = useState(null);
  const [filter, setFilter] = useState({
    workerId: "",
    workId: "",
    paid: false,
    all: true,
    start: new Date(),
    end: new Date(),
  });
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      await DataStore.query(UserCredentials).then((users) => {
        let a = [];
        for (let i = 0; i < users.length; i++) {
          a.push({
            id: users[i].userId,
            first_name: users[i].profile.first_name,
            last_name: users[i].profile.last_name,
            email: users[i].profile.email,
            status: users[i].status,
          });
        }
        setWorker(a);
      });
    };
    isActive && fetchData();
    return () => (isActive = false);
  }, []);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      const a = [];
      const data = await DataStore.query(AllWorkSpaces);
      for (let i = 0; i < data.length; i++) {
        a.push({
          id: data[i].id,
          name: data[i].name,
          hourlyRate: data[i].hourlyRate,
        });
      }
      setWorks(a);
    };

    isActive && fetchData();
    return () => (isActive = false);
  }, []);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      const data = await DataStore.query(TimeEntry);
      setData(sortData(data, filter.paid, filter.start, filter.end, filter.all, filter.workerId, filter.workId));
    };

    isActive && fetchData();
    return () => (isActive = false);
  }, [filter.paid, filter.start, filter.end, filter.all, isEmpty, filter.workerId, filter.workId]);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
        setEmpty(data.isEmpty);
      }
    });
  }, []);

  return (
    <Container>
      {data && works ? (
        <Box sx={{ height: "100vh" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={7}>
              <Typography variant="h1" sx={{ padding: "1rem 0rem" }}>
                Maksua odottavat
              </Typography>
            </Grid>
            <Grid item xs={1} align="right">
              <Pdf data={data} works={works} workers={worker} />
            </Grid>
            <Grid item xs={2} align="right">
              <AddTimeShift workers={worker} works={works} />
            </Grid>
            <Grid item xs={2} align="right">
              <Filter oldFilter={filter} setOldFilter={setFilter} workers={worker} works={works} />
            </Grid>
          </Grid>

          {data.map((item) => {
            let workname = works.find((work) => work.id === item.workspaceId)
              ? works.find((work) => work.id === item.workspaceId).name
              : "Työ paikkaa ei löytynyt";
            let total = totalworkplacetime(item.arr, filter.all);
            total = `${total.hours}h ${total.minutes}m`;
            return (
              <Box key={item.workspaceId}>
                <Box
                  sx={{
                    border: "3px solid",
                    borderColor: "default.orange",
                    padding: "20px 40px",
                    margin: "15px 0px",
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                      <Typography variant="p">{workname}</Typography>
                    </Grid>
                    <Grid item xs={6} align="center">
                      <Typography variant="p">Period</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                      <Typography variant="p">{total}</Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </Box>

                {item.arr.map((item) => (
                  <Row item={item} key={item.userId} all={filter.all} workers={worker} works={works} />
                ))}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ height: "100vh" }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
