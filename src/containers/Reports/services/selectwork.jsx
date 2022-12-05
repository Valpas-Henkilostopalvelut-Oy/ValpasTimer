import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PropTypes } from "prop-types";

export const Selectwork = ({
  works,
  selectedOption,
  setSelectedOption,
  lang = {
    workplace: "Workplace",
  },
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{lang.workplace}</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedOption} label={lang.workplace} onChange={(e) => setSelectedOption(e.target.value)}>
        {works.map((work) => (
          <MenuItem key={work.id} value={work.id}>
            {work.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Selectwork.propTypes = {
  works: PropTypes.array,
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
  lang: PropTypes.object,
};
