import React, { useState } from "react";
import {
  TextField,
  Typography,
  useTheme,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const isSent = date.isSent;

  return (
    <>
      <Typography
        variant="p"
        onClick={() => setOpen(true && !isSent)}
        sx={{
          cursor: !isSent && "pointer",
        }}
      >
        {desc !== "" ? maxText(desc, 70) : <DescriptionIcon />}
      </Typography>
      <Dialog open={open && !isSent} onClose={() => setOpen(false)} maxWidth={"xs"} fullWidth={true}>
        <DialogTitle>{lang.add_description}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateDescription(date, desc);
              setOpen(false);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDescription.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
};
