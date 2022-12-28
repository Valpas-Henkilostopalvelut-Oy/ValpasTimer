import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models/index.js";
import { PropTypes } from "prop-types";

export const EditWorkitemTimer = ({ workitems, workitem, setWorkitem, isStarted, data }) => {
  const handleChange = (event) => {
    if (data && isStarted) {
      console.log(data, event.target.value);
    }
    setWorkitem(event.target.value);
    console.log(event.target.value, workitems);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="workitem-select-label">Workitem</InputLabel>
      <Select
        labelId="workitem-select-label"
        id="workitem-select"
        value={workitem}
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
