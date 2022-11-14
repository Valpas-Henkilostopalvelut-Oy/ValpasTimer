import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const Selectwork = ({ works, setSel, sel }) => {
  return (
    works !== null && (
      <FormControl fullWidth>
        <InputLabel id="workplace-select">Workplace select</InputLabel>
        <Select
          labelId="workplace-select"
          id="workplace-select"
          value={sel}
          label="Workplace select"
          onChange={(e) => setSel(e.target.value)}
          defaultValue="0"
        >
          <MenuItem value="0">All</MenuItem>
          {works.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};
