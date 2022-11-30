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
import { HistoryRow } from "./services/history.jsx";

const Timer = () => {
  const [grouped, setGrouped] = useState(null);
  const [selected, setSelected] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [works, setWorks] = useState(null);
  const { langValue } = useAppContext();
  const thisweek = getWeekNumber(new Date());
  const [notConfirmedWeek, setNotConfirmedWeek] = useState(null);
  const [confirmedWeeks, setConfirmedWeeks] = useState(null);
  const theme = useTheme();
  const lang = langValue.track || {
    recorder: {
      tabs: {
        timer: "Timer",
        manual: "Manual",
      },
      timer: {
        description: "Description",
        workplace: "Workplace",
        start: "Start",
        stop: "Stop",
        edit_start: {
          title: "Edit start time",
          start_time: "Start time",
          save: "Save",
          cancel: "Cancel",
        },
      },
      manual: {
        description: "Description",
        workplace: "Workplace",
        date: "Date",
        start_time: "Start time",
        end_time: "End time",
        create: "Create",
      },
    },
    history: {
      week: "Week",
      total_time: "Total time",
      none_description: "No description",
      date: "Date",
      workplace: "Workplace",
      sent: "Sent",
      confirmed: "Confirmed",
      add_description: "Add description",
      title: {
        this_week: "This week",
        select_workplace: "Select workplace",
        history: "History",
        none_times: "This week you have not tracked any time",
        not_confirmed: "Not confirmed times",
      },

      buttons: {
        report: "Report",
        delete: "Delete",
        dublicate: "Dublicate",
        save: "Save",
        cancel: "Cancel",
        send: "Send",
        cancelsend: "Cancel send",
        reportweek: "Report all week",
      },
    },
  };

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
          const filtered = data.filter(
            (a) => !a.isActive && a.isSent && a.userId === user.username && !a.isConfirmed && a.workspaceId === selected
          );

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
          const filtered = data.filter((a) => !a.isActive && a.userId === user.username && a.workspaceId === selected);

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
          <Recorder works={works} isEmpty={isEmpty} lang={lang.recorder} />
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Selectwork works={works} sel={selected} setSel={setSelected} lang={lang.history} />
          </Box>
        </Grid>

        {selected !== "" ? (
          <>
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "track.yellow",

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
                    {lang.history.title.this_week}
                  </Typography>
                </Box>

                {grouped && grouped.length > 0 ? (
                  <WeekRow grouped={grouped} lang={lang} isEmpty={isEmpty} works={works} />
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="h6" color="text.secondary">
                      {lang.history.title.none_times}
                    </Typography>
                  </Grid>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "track.red",
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
                    {lang.history.title.not_confirmed}
                  </Typography>
                </Box>

                {notConfirmedWeek && notConfirmedWeek.length > 0 && (
                  <WeekRow grouped={notConfirmedWeek} lang={lang} isEmpty={isEmpty} works={works} />
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: "track.green",
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
                    {lang.history.title.history}
                  </Typography>
                </Box>

                {confirmedWeeks && confirmedWeeks.length > 0 && (
                  <HistoryRow grouped={confirmedWeeks} lang={lang} isEmpty={isEmpty} works={works} />
                )}
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              {lang.history.title.select_workplace}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Timer;
