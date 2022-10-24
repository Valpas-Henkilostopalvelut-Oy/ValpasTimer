import React, { Fragment, useEffect, useState } from "react";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry } from "../../models";
import { useAppContext } from "../../services/contextLib.jsx";
import {
  Container,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Recorder from "./Recorder/index.jsx";
import { groupBy } from "./services/group.jsx";
import WorkspaceSelect from "../../components/WorkSpaceSelect/index.jsx";
import { totaldaytime } from "./services/totaldaytime";
import { totalweektime } from "./services/totalweektime";
import { Details } from "./Table/index.jsx";

const Timer = () => {
  const { isAuthenticated } = useAppContext();
  const [grouped, setGrouped] = useState([]);
  const [selected, setSelected] = useState("");

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
      console.log(groupBy(filtered));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    let isActive = false;

    !isActive && isAuthenticated && loadTimeList();

    return () => (isActive = true);
  }, [isAuthenticated, selected]);

  //loading if grouped, timelist and selected option are null

  return (
    <Container>
      {grouped != null ? (
        <Fragment>
          <Recorder loadTimeList={loadTimeList} />
          <WorkspaceSelect selectedOption={selected} setSelectedOption={setSelected} />
          <Grid container spacing={2}>
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
                  <Grid container item xs={12}>
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
                          {totaldaytime(date).h}:{totaldaytime(date).min}
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
        </Fragment>
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
