import { TextField, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { timeMaker } from "../../services/time";

const TimeEditing = ({ time, onChange }) => {
  const d = new Date(time);

  const [value, setValue] = useState(
    `${String("0" + d.getHours()).slice(-2)}:${String(
      "0" + d.getMinutes()
    ).slice(-2)}`
  );

  return (
    <TextField
      sx={{ width: 42 }}
      variant="standard"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={(event) => {
        let val = timeMaker(event, time);

        setValue(
          `${String("0" + val.h).slice(-2)}:${String("0" + val.m).slice(-2)}`
        );
        return onChange(val);
      }}
    />
  );
};

export default TimeEditing;