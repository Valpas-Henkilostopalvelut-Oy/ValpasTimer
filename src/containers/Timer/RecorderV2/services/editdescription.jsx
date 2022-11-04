import React from "react";
import { TextField } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models";

export const EditDescription = ({ description, setDescription }) => {
  return (
    <TextField
      id="description"
      label="Description"
      variant="outlined"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      fullWidth
    />
  );
};

export const EditDescriptionTimer = ({ description, setDescription, data, isStarted }) => {
  const handleEdit = async (e) => {
    console.log(isStarted);
    isStarted &&  await DataStore.save(
      TimeEntry.copyOf(data, (updated) => {
        updated.description = e.target.value;
      })
    ).catch((e) => console.warn(e));
  };
  return (
    <TextField
      id="description"
      label="Description"
      variant="outlined"
      value={description}
      onChange={(e) => {
        setDescription(e.target.value);
      }}
      onBlur={handleEdit}
      fullWidth
    />
  );
};
