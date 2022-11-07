import React, { useEffect, useState } from "react";
import { DataStore, Auth, Hub } from "aws-amplify";
import { AllWorkSpaces, TimeEntry } from "../../models";
import { Container, Box, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import { Recorder } from "./Recorder/index.jsx";
import { groupBy } from "./services/group.jsx";
import { totaldaytime, totalweektime } from "./services/totaltime";
import { Details } from "./services/table.jsx";
import { Selectwork } from "./services/workplaceselect";

const Timer = () => {
  const [grouped, setGrouped] = useState([]);
  const [selected, setSelected] = useState("");
  const theme = useTheme();
  const [isEmpty, setIsEmpty] = useState(true);
  const [works, setWorks] = useState(null);

  useEffect(() => {
    let isActive = false;

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

  useEffect(() => {
    let isActive = false;

    const loadWorks = async () => {
      await DataStore.query(AllWorkSpaces)
        .then((data) => {
          let w = [];
          for (let i = 0; i < data.length; i++) {
            let work = data[i];
            w.push({
              id: work.id,
              name: work.name,
            });
          }
          setWorks(w);
        })
        .catch((error) => console.warn(error));
    };

    !isActive && loadWorks();
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
            <Recorder works={works} isEmpty={isEmpty} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{}}>
              <Selectwork works={works} sel={selected} setSel={setSelected} />
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
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "1px",
                      backgroundColor: "background.custom",
                      marginBottom: "15px",
                      marginTop: "15px",
                      padding: 1,
                    }}
                  >
                    <Grid item xs={12}>
                      <Typography variant="h6" color="text.secondary">
                        {date.date}
                      </Typography>
                      <Typography variant="p" color="text.secondary">
                        Total time: {totaldaytime(date).h > 9 ? totaldaytime(date).h : "0" + totaldaytime(date).h}:
                        {totaldaytime(date).min > 9 ? totaldaytime(date).min : "0" + totaldaytime(date).min}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Details date={date} workplaces={works} />
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
