import React, { useEffect, useState } from "react";
import { DataStore, Auth, Hub } from "aws-amplify";
import { AllWorkSpaces, TimeEntry } from "../../models";
import { Container, Box, Grid, Typography, useTheme } from "@mui/material";
import { Recorder } from "./Recorder/index.jsx";
import { groupBy } from "./services/group.jsx";
import { Selectwork } from "./services/workplaceselect";
import { useAppContext } from "../../services/contextLib";
import { getWeekNumber } from "./services/group";
import { WeekRow } from "./services/row.jsx";

const Timer = () => {
  const [grouped, setGrouped] = useState(null);
  const [selected, setSelected] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [works, setWorks] = useState(null);
  const { langValue } = useAppContext();
  const track = langValue.track;
  const thisweek = getWeekNumber(new Date());
  // eslint-disable-next-line no-unused-vars
  const [notConfirmedWeek, setNotConfirmedWeek] = useState(null);
  const [confirmedWeeks, setConfirmedWeeks] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    let isActive = false;

    const loadTimeList = async () => {
      try {
        const databaseTimeList = await DataStore.query(TimeEntry);
        const currentUser = await Auth.currentAuthenticatedUser();

        const filtered = databaseTimeList
          .filter((a) => !a.isActive)
          .filter((u) => u.userId === currentUser.username)
          .filter((w) => w.workspaceId === selected || selected === "0");

        setGrouped(groupBy(filtered).filter((t) => t.week === thisweek));
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && isEmpty && selected !== "" && loadTimeList();

    return () => (isActive = true);
  }, [isEmpty, selected, isEmpty]);

  useEffect(() => {
    let isActive = false;

    const loadNotConfirmedTimes = async () => {
      await Auth.currentAuthenticatedUser().then(async (user) => {
        await DataStore.query(TimeEntry).then((data) => {
          const filtered = data.filter((a) => !a.isActive && a.isSent && a.userId === user.username && !a.isConfirmed);

          setNotConfirmedWeek(groupBy(filtered).filter((w) => w.week !== thisweek));
        });
      });
    };

    !isActive && isEmpty && selected !== "" && loadNotConfirmedTimes();

    return () => (isActive = true);
  }, [selected, isEmpty]);

  useEffect(() => {
    let isActive = false;

    const loadHistory = async () => {
      await Auth.currentAuthenticatedUser().then(async (user) => {
        await DataStore.query(TimeEntry).then((data) => {
          const filtered = data.filter((a) => !a.isActive && a.userId === user.username);

          setConfirmedWeeks(groupBy(filtered).filter((w) => w.week !== thisweek));
        });
      });
    };

    !isActive && isEmpty && selected !== "" && loadHistory();
  }, [selected, isEmpty]);

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
          padding: "0px",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Recorder works={works} isEmpty={isEmpty} lang={track.recorder} />
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Selectwork works={works} sel={selected} setSel={setSelected} lang={track.history} />
          </Box>
        </Grid>

        {selected !== "" ? (
          <>
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "background.custom",

                  [theme.breakpoints.up("sm")]: {
                    padding: "10px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    padding: "10px 0px",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "background.paper",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    This week
                  </Typography>
                </Box>

                {grouped && grouped.length > 0 ? (
                  <WeekRow grouped={grouped} lang={track} isEmpty={isEmpty} works={works} />
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="h6" color="text.secondary">
                      This week you have not tracked any time.
                    </Typography>
                  </Grid>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "background.custom",
                  [theme.breakpoints.up("sm")]: {
                    padding: "10px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    padding: "20px 0px",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "background.paper",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Not confirmed times
                  </Typography>
                </Box>

                {notConfirmedWeek && notConfirmedWeek.length > 0 && (
                  <WeekRow grouped={notConfirmedWeek} lang={track} isEmpty={isEmpty} works={works} />
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "background.custom",
                  [theme.breakpoints.up("sm")]: {
                    padding: "10px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    padding: "10px 0px",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "background.paper",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    History
                  </Typography>
                </Box>

                {confirmedWeeks && confirmedWeeks.length > 0 && (
                  <WeekRow grouped={confirmedWeeks} lang={track} isEmpty={isEmpty} works={works} />
                )}
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Select workspace
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Timer;
