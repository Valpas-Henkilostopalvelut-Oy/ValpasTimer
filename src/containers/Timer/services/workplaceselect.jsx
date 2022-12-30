import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const Selectwork = ({ works, setSel, sel, lang = { workplace: "Workplace", all: "All" } }) => {
  return (
    works !== null && (
      <FormControl fullWidth>
        <InputLabel id="workplace-select">{lang.workplace}</InputLabel>
        <Select
          labelId="workplace-select"
          id="workplace-select"
          value={sel}
          label={lang.workplace}
          onChange={(e) => setSel(e.target.value)}
        >
          <MenuItem value="">{lang.all}</MenuItem>
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
