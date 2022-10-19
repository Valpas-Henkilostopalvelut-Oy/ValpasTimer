import React, { useState } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { TextField, Typography } from "@mui/material";

export const EditDescription = ({ reload, description, data, id, isSent }) => {
  const [desc, setDesc] = useState(description);

  const updateDesc = async () => {
    console.log(desc);
    try {
      await DataStore.save(
        TimeEntry.copyOf(data, (update) => {
          update.description = desc;
        })
      );
    } catch (error) {
      console.warn(error);
    }
  };

  return !isSent ? (
    <TextField
      onChange={(event) => setDesc(event.target.value)}
      onBlur={updateDesc}
      value={desc}
      fullWidth
      multiline
      rows={2}
      placeholder="Add description"
      variant="standard"
    />
  ) : desc !== "" ? (
    <Typography variant="p">{desc}</Typography>
  ) : (
    <Typography variant="p">None description</Typography>
  );
};
