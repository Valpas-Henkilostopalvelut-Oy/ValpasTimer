import React from "react";
import { Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Timer } from "./Timer/index.jsx";
import { Manual } from "./Manual/index.jsx";

const Recorder = ({ loadTimeList, works, isEmpty }) => {
  const [value, setValue] = React.useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        [theme.breakpoints.down("sm")]: {
          padding: "0px 10px",
        },
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChangeTab} aria-label="Manual and Timer Tabs">
            <Tab label="Timer" value="1" />
            <Tab label="Manual" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Timer reload={loadTimeList} />
        </TabPanel>
        <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Manual reload={loadTimeList} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Recorder;
