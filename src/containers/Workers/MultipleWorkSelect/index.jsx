import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleWorkSelect = ({ works }) => {
  const [workname, setWorkname] = useState([]);

  const handleeChange = (event) => {
    const {
      target: { value },
    } = event;
    setWorkname(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="demo-multiple-checkbox-label">Works</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={workname}
        onChange={handleeChange}
        input={<OutlinedInput lable="Tag" />}
        renderValue={(selected) => selected.name}
        MenuProps={MenuProps}
      >
        {works.map((val) => (
          <MenuItem key={val.id} value={val.name}>
            <Checkbox checked={workname.indexOf(val) > -1} />
            <ListItemText primary={val.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleWorkSelect;
