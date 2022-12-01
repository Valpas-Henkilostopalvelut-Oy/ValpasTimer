import React from "react";
import { TextField } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models";

export const EditDescription = ({ description, setDescription, lang = { description: "Description" } }) => {
  return (
    <TextField
      variant="outlined"
      id="description"
      label={lang.description}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      fullWidth
    />
  );
};

export const EditDescriptionTimer = ({
  description,
  setDescription,
  data,
  isStarted,
  lang = { description: "Description" },
}) => {
  const handleEdit = async (e) => {
    isStarted &&
      (await DataStore.save(
        TimeEntry.copyOf(data, (updated) => {
          updated.description = e.target.value;
        })
      ).catch((e) => console.warn(e)));
  };
  return (
    <TextField
      id="description"
      label={lang.description}
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
