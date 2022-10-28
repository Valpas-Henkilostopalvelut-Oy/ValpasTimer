import React, { useEffect, useState } from "react";
import { DataStore, Auth, Hub } from "aws-amplify";
import { TimeEntry } from "../../models";
import { Container, Box, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import Recorder from "./Recorder/index.jsx";
import { groupBy } from "./services/group.jsx";
import { totaldaytime, totalweektime } from "./services/totaltime";
import { Details } from "./Table/index.jsx";
import { WorklistSelect } from "../../components/WorkSpaceSelect/index.jsx";

const Timer = () => {
  const [grouped, setGrouped] = useState([]);
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const [isEmpty, setIsEmpty] = useState(true);

  const loadTimeList = async () => {
    try {
      const databaseTimeList = await DataStore.query(TimeEntry);
      const currentUser = await Auth.currentAuthenticatedUser();

      const filtered = databaseTimeList
        .sort((date1, date2) => {
          let d1 = new Date(date2.timeInterval.start);
          let d2 = new Date(date1.timeInterval.start);
          return d1 - d2;
        })
        .filter((a) => !a.isActive)
        .filter((u) => u.userId === currentUser.username)
        .filter((w) => w.workspaceId === selected);

      setGrouped(groupBy(filtered));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    let isActive = false;

    !isActive && isEmpty && loadTimeList();

    return () => (isActive = true);
  }, [isEmpty, selected]);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
        setIsEmpty(data.isEmpty);
      }
    });
  }, []);

  //loading if grouped, timelist and selected option are null

  return (
    <Container
      sx={{
        [theme.breakpoints.down("sm")]: {
          paddingRight: "0px",
          paddingLeft: "0px",
        },
      }}
    >
      {grouped != null ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Recorder loadTimeList={loadTimeList} />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{}}>
              <WorklistSelect sel={selected} setSel={setSelected} />
            </Box>
          </Grid>
          {grouped.map((week) => (
            <Grid container item spacing={2} key={week.week}>
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary">
                  Week {week.week}
                </Typography>
                <Typography variant="p" color="text.secondary">
                  Total time: {totalweektime(week).h}:{totalweektime(week).min}
                </Typography>
              </Grid>
              {week.arr.map((date) => (
                <Grid container item xs={12} key={date.date}>
                  <Grid
                    container
                    item
                    sx={{ backgroundColor: "background.custom", marginBottom: "15px", marginTop: "15px", padding: 1 }}
                  >
                    <Grid item xs={6} display="flex" alignItems="start">
                      {date.date}
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="end">
                      <Typography variant="p">
                        {`${String("0" + totaldaytime(date).h).slice(-2)}:${String("0" + totaldaytime(date).min).slice(
                          -2
                        )}`}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Details date={date} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Timer;
