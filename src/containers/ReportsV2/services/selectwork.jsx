import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const Selectwork = ({ works, selectedOption, setSelectedOption }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Work</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Work"
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {works.map((work) => (
          <MenuItem key={work.id} value={work.id}>
            {work.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
