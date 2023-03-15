import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Timer } from "./services/timer.jsx";
import { Manual } from "./services/manual.jsx";
import { PropTypes } from "prop-types";

export const Recorder = (props) => {
  const [value, setValue] = useState("1");
  const { lang, ...otherProps } = props;

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
          <Timer lang={lang.timer} {...otherProps} />
        </TabPanel>
        <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Manual lang={lang.manual} {...otherProps}/>
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
