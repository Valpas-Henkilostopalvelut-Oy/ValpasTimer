import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Timer } from "./services/timer.jsx";
import { Manual } from "./services/manual.jsx";

export const Recorder = ({ works = null, lang, isEmpty = false }) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("1");
  const [sel, setSel] = useState("");
  const [isStarted, setStarted] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <TabList onChange={handleChangeTab} aria-label="Manual and Timer Tabs">
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
          />
        </TabPanel>
        <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Manual
          isEmpty={isEmpty}
            description={description}
            setDescription={setDescription}
            sel={sel}
            setSel={setSel}
            works={works}
            lang={lang.manual}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
