import React, { useEffect, useState } from "react";
import { Box, Tab, useTheme, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { EditDescription } from "./services/editdescription.jsx";
import { EditWorkplace } from "./services/editworkplace.jsx";
import { Timer } from "./services/timer.jsx";
import { StartTimer } from "./services/starttimer.jsx";
import { Manual } from "./services/manual.jsx";

export const Recorder = ({ works = null, isEmpty = true }) => {
  const theme = useTheme();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("1");
  const [sel, setSel] = useState("");
  const [isStarted, setStarted] = useState(false);

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
          <Timer
            description={description}
            setDescription={setDescription}
            sel={sel}
            setSel={setSel}
            works={works}
            isStarted={isStarted}
            setStarted={setStarted}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Manual />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
