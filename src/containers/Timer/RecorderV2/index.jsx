import React, { useEffect, useState } from "react";
import { Box, Tab, useTheme, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { EditDescription } from "./services/editdescription.jsx";
import { EditWorkplace } from "./services/editworkplace.jsx";
import { Timer } from "./services/timer.jsx";
import { StartTimer } from "./services/starttimer.jsx";

export const Recorder = () => {
  const theme = useTheme();
  const [description, setDescription] = React.useState("");
  const [value, setValue] = React.useState("1");
  const [workplace, setWorkplace] = React.useState(null);
  const [isStarted, setStarted] = useState(false);
  const [timerTime, setTimerTime] = useState(null);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: {
          padding: "0px 10px",
        },
      }}
    >
      <TabContext value={value}>
        <TabList onChange={handleChangeTab} aria-label="Manual and Timer Tabs">
          <Tab label="Timer" value="1" />
          <Tab label="Manual" value="2" />
        </TabList>
        <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <EditDescription description={description} setDescription={setDescription} />
            </Grid>
            <Grid item xs={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <EditWorkplace workplace={workplace} setWorkplace={setWorkplace} />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Timer
                description={description}
                workplace={workplace}
                setWorkplace={setWorkplace}
                isStarted={isStarted}
                setStarted={setStarted}
                timerTime={timerTime}
                setTimerTime={setTimerTime}
              />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <StartTimer
                description={description}
                workplace={workplace}
                isStarted={isStarted}
                setStarted={setStarted}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <EditDescription description={description} setDescription={setDescription} />
            </Grid>
            <Grid item xs={4}>
              <EditWorkplace workplace={workplace} setWorkplace={setWorkplace} />
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};
