import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models/index.js";
import { PropTypes } from "prop-types";

const updateworkitem = async (data, item) => {
  await DataStore.save(
    TimeEntry.copyOf(data, (updated) => {
      updated.work = item;
    })
  ).catch((e) => console.warn(e));
};

export const EditWorkitemTimer = ({ workitems, workitem, setWorkitem, isStarted, data }) => {
  const handleChange = (event) => {
    if (data && isStarted) {
      const item = workitems ? workitems.find((item) => item.id === event.target.value) : null;
      updateworkitem(data, item);
    }
    setWorkitem(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="workitem-select-label">Workitem</InputLabel>
      <Select
        labelId="workitem-select-label"
        id="workitem-select"
        value={workitems ? workitem : ""}
        label="Workitem"
        onChange={handleChange}
        disabled={!Boolean(workitems)}
      >
        {workitems &&
          workitems.map((item, i) => (
            <MenuItem key={i} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export const EditWorkitemManual = ({ workitems, workitem, setWorkitem }) => {
  const handleChange = (event) => {
    setWorkitem(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="workitem-select-label">Workitem</InputLabel>
      <Select
        labelId="workitem-select-label"
        id="workitem-select"
        value={workitems ? workitem : ""}
        label="Workitem"
        onChange={handleChange}
        disabled={!Boolean(workitems)}
      >
        {workitems &&
          workitems.map((item, i) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
