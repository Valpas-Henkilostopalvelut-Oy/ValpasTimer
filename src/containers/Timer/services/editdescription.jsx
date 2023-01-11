import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";
import DescriptionIcon from "@mui/icons-material/Description";
import { maxText } from "./functions.jsx";

const updateDescription = async (date, newDescription) => {
  await DataStore.save(
    TimeEntry.copyOf(date, (updated) => {
      updated.description = newDescription;
    })
  ).catch((e) => console.warn(e));
};

export const EditDescription = ({
  date,
  lang = {
    none_description: "No description",
    add_description: "Add description",
  },
}) => {
  const [desc, setDesc] = useState(date.description);
  return (
    <TextField
      id="outlined-multiline-static"
      variant="standard"
      fullWidth
      multiline
      rows={3}
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      placeholder={lang.add_description}
    />
  );
};

EditDescription.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
};
