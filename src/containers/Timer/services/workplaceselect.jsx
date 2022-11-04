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
        >
          {works.map((item, i) => (
            <MenuItem key={i} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};
