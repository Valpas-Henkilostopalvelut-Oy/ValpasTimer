import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Timer } from "./services/timer.jsx";
import { Manual } from "./services/manual.jsx";
import { PropTypes } from "prop-types";

export const Recorder = ({
  thisweek,
  works = null,
  lang,
  isEmpty = false,
  isStarted,
  setStarted,
  description,
  setDescription,
  setSel,
  sel,
  time,
  timerTime,
  setTime,
  setTimer,
  setIsPaused,
  isPaused,
  workitems,
  setWorkitems,
  workitem,
  setWorkitem,
}) => {
  const [value, setValue] = useState("1");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <TabList onChange={handleChangeTab} aria-label="Manual and Timer Tabs" variant="fullWidth">
          <Tab label={lang.tabs.timer} value="1" />
          <Tab label={lang.tabs.manual} value="2" />
        </TabList>
        <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Timer
            isEmpty={isEmpty}
            description={description}
            setDescription={setDescription}
            sel={sel}
            setSel={setSel}
            works={works}
            isStarted={isStarted}
            setStarted={setStarted}
            lang={lang.timer}
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
        </TabPanel>
        <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Manual
            thisweek={thisweek}
            isEmpty={isEmpty}
            description={description}
            setDescription={setDescription}
            sel={sel}
            setSel={setSel}
            works={works}
            lang={lang.manual}
            setWorkitem={setWorkitem}
            workitem={workitem}
            workitems={workitems}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

Recorder.propTypes = {
  works: PropTypes.array,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
};
