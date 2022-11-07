import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models";

const updateWork = async (data, sel) => {
  await DataStore.save(
    TimeEntry.copyOf(data, (updated) => {
      updated.work = sel;
    })
  ).catch((e) => console.warn(e));
};

export const EditWorkplaceTimer = ({ setSel, sel, works = null, isStarted = false, data }) => {
  const handleChange = (event) => {
    if (data && isStarted) {
      updateWork(data, event.target.value);
    }
    setSel(event.target.value);
  };

  return (
    works && (
      <FormControl fullWidth>
        <InputLabel id="workplace-select-label">Workplace</InputLabel>
        <Select
          labelId="workplace-select-label"
          id="workplace-select"
          value={sel}
          label="Workplace"
          onChange={handleChange}
        >
          {works &&
            works.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    )
  );
};

export const EditWorkplaceManual = ({ setSel, sel, works = null }) => {
  const handleChange = (event) => {
    setSel(event.target.value);
  };

  return (
    works && (
      <FormControl fullWidth variant="outlined">
        <InputLabel id="workplace-select-label">Workplace</InputLabel>
        <Select
          labelId="workplace-select-label"
          id="workplace-select"
          value={sel}
          label="Workplace"
          onChange={handleChange}
        >
          {works &&
            works.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    )
  );
};
