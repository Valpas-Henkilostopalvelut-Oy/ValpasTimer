import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";

const updateDescription = async (date, newDescription) => {
  await DataStore.save(
    TimeEntry.copyOf(date, (updated) => {
      updated.description = newDescription;
    })
  ).catch((e) => console.warn(e));
};

export const EditDescription = ({ date }) => {
  const [desc, setDesc] = useState(date.description);
  const [click, setClick] = useState(false);

  return date.isSent ? (
    <Typography variant="p">{desc !== "" ? desc : "None description"}</Typography>
  ) : !click ? (
    <Typography variant="p" onClick={() => setClick(!click)}>
      {desc !== "" ? desc : "None description"}
    </Typography>
  ) : (
    <TextField
      id="outlined-multiline-static"
      variant="standard"
      autoFocus
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      onBlur={(e) => {
        updateDescription(date, e.target.value);
        setClick(!click);
      }}
      fullWidth
      placeholder="Add description"
    />
  );
};
