import React from "react";
import { TextField } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models/index.js";
import { PropTypes } from "prop-types";

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

export const EditDescriptionTimer = (props) => {
  const { description, setDescription, timerTime, isStarted, lang = { description: "Description" } } = props;
  const handleEdit = async (e) => {
    isStarted &&
      (await DataStore.save(
        TimeEntry.copyOf(timerTime, (updated) => {
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

EditDescription.propTypes = {
  description: PropTypes.string,
  setDescription: PropTypes.func,
  lang: PropTypes.object,
};

EditDescriptionTimer.propTypes = {
  description: PropTypes.string,
  setDescription: PropTypes.func,
  data: PropTypes.object,
  isStarted: PropTypes.bool,
  lang: PropTypes.object,
};
