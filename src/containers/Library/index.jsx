import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, Checkbox, CircularProgress } from "@mui/material";
import { sortData } from "./services/datasort.jsx";
import { DataStore } from "aws-amplify";
import { TimeEntry, AllWorkSpaces } from "../../models/index.js";
import { Row } from "./services/row.jsx";
import { totalworkplacetime } from "./services/timecalc";
import { Filter } from "./services/morebuttons.jsx";

export const Library = () => {
  const [data, setData] = useState(null);
  const [works, setWorks] = useState(null);
  const [filter, setFilter] = useState({
    paid: false,
    all: true,
    start: new Date(),
    end: new Date(),
  });
  const [workers, setWorkers] = useState(null);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      const data = await DataStore.query(AllWorkSpaces);
      setWorks(data);
    };

    isActive && fetchData();
    return () => (isActive = false);
  }, []);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      const data = await DataStore.query(TimeEntry);
      setData(sortData(data, filter.paid, filter.start, filter.end, filter.all));
    };

    isActive && fetchData();
    return () => (isActive = false);
  }, [filter.paid, filter.start, filter.end, filter.all]);

  return (
    <Container>
      {data && works ? (
        <Box sx={{ height: "100vh" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={11}>
              <Typography
                variant="h1"
                sx={{
                  padding: "1rem 0rem",
                }}
              >
                Maksua odottavat
              </Typography>
            </Grid>
            <Grid item xs={1} align="right">
              <Filter filter={filter} setFilter={setFilter} />
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
                  <Row item={item} key={item.userId} all={filter.all} />
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
