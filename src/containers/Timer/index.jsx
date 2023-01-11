import React, { useEffect, useState } from "react";
import { DataStore, Auth, Hub } from "aws-amplify";
import { AllWorkSpaces, TimeEntry } from "../../models/index.js";
import { Container, Box, Grid, Typography, useTheme, CircularProgress } from "@mui/material";
import { Recorder } from "./Recorder/index.jsx";
import { groupBy } from "./services/group.jsx";
import { Selectwork } from "./services/workplaceselect.jsx";
import { useAppContext } from "../../services/contextLib.jsx";
import { getWeekNumber } from "./services/group.jsx";
import { WeekRow } from "./services/table.jsx";
import { checkActive, advanceTime } from "./services/loadtimer.jsx";

const Timer = () => {
  const [grouped, setGrouped] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [works, setWorks] = useState(null);
  const { langValue } = useAppContext();
  const thisweek = getWeekNumber(new Date());
  const [notConfirmedWeek, setNotConfirmedWeek] = useState(null);
  const theme = useTheme();
  const [selected, setSelected] = useState("");
  const [isStarted, setStarted] = useState(null);
  const [description, setDescription] = useState("");
  const [sel, setSel] = useState("");
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [timerTime, setTimer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [workitems, setWorkitems] = useState(null);
  const [workitem, setWorkitem] = useState("");
  const [notsent, setNotsent] = useState(null);

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
    let isCanceled = false;

    isStarted && !isPaused && !isCanceled && advanceTime(time, setTime);

    return () => (isCanceled = true);
  }, [isStarted, time, isPaused]);

  useEffect(() => {
    let isActive = false;

    const loadlist = async () => {
      await Auth.currentAuthenticatedUser().then(async (user) => {
        await DataStore.query(TimeEntry).then((data) => {
          const currentweek = data.filter(
            (a) =>
              !a.isActive &&
              a.userId === user.username &&
              (selected !== "all" ? a.workspaceId === selected : true) &&
              !a.isSent
          );

          const notconfirmedweek = data.filter(
            (a) =>
              !a.isActive &&
              a.isSent &&
              a.userId === user.username &&
              !a.isConfirmed &&
              (selected !== "all" ? a.workspaceId === selected : true)
          );

          const notsentweek = data.filter(
            (a) =>
              !a.isActive &&
              !a.isSent &&
              a.userId === user.username &&
              (selected !== "all" ? a.workspaceId === selected : true)
          );

          setNotConfirmedWeek(groupBy(notconfirmedweek, works, langValue));
          setGrouped(groupBy(currentweek, works, langValue).filter((t) => t.week === thisweek));
          setNotsent(groupBy(notsentweek, works, langValue).filter((t) => t.week !== thisweek));
        });
      });
    };

    !isActive && isEmpty && loadlist();

    return () => (isActive = true);
  }, [isEmpty, works, langValue, thisweek, selected]);

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
              works: work.work,
            });
          }
          setWorks(w);
          setSelected("all");
        })
        .catch((error) => console.warn(error));
    };

    !isActive && loadWorks();
  }, []);

  useEffect(() => {
    let isActive = true;

    if (isActive && works !== null) {
      checkActive(setTimer, setTime, setSel, setDescription, setStarted, setIsPaused, setWorkitem);
    }

    return () => (isActive = false);
  }, [works]);

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

    const loadWorklist = async () => {
      await DataStore.query(AllWorkSpaces, sel)
        .then((data) => {
          setWorkitems(data.work);
        })
        .catch((error) => console.warn(error));
    };

    !isActive && sel !== "" && loadWorklist();

    return () => (isActive = true);
  }, [sel]);

  return (
    <Container
      sx={{
        [theme.breakpoints.down("sm")]: {
          padding: "5px",
        },
      }}
    >
      {notConfirmedWeek && grouped && !(isStarted === null) ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Recorder
              thisweek={grouped}
              works={works}
              isEmpty={isEmpty}
              lang={lang.recorder}
              isStarted={isStarted}
              setStarted={setStarted}
              description={description}
              setDescription={setDescription}
              setSel={setSel}
              sel={sel}
              time={time}
              timerTime={timerTime}
              setTime={setTime}
              setTimer={setTimer}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              workitems={workitems}
              setWorkitems={setWorkitems}
              workitem={workitem}
              setWorkitem={setWorkitem}
            />
          </Grid>

          <Grid item xs={12}>
            <Selectwork works={works} sel={selected} setSel={setSelected} lang={lang.history} />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                padding: "10px",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {lang.history.title.this_week}
              </Typography>
            </Box>

            {grouped.length > 0 && (
              <WeekRow
                grouped={grouped}
                lang={lang}
                isEmpty={isEmpty}
                works={works}
                selected={selected}
                isThis={true}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "background.paper",
                padding: "10px",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Ei lähetetty
              </Typography>
            </Box>

            {notsent.length > 0 && (
              <WeekRow grouped={notsent} lang={lang} isEmpty={isEmpty} works={works} selected={selected} isNotSent={true} />
            )}
          </Grid>

          <Grid item xs={12}>
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

            {notConfirmedWeek.length > 0 && (
              <WeekRow grouped={notConfirmedWeek} lang={lang} isEmpty={isEmpty} works={works} selected={selected} />
            )}
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Timer;
