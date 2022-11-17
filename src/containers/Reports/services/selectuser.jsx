import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const Selectuser = ({
  users,
  setSelectedOption,
  selectedOption,
  disabled,
  lang = {
    worker: "Worker",
  },
}) => {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="demo-simple-select-label">{lang.worker}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label={lang.worker}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {users &&
          users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
