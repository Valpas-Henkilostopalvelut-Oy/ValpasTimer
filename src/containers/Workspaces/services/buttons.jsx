import React, { useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Settings } from "./settings.jsx";

const deletework = async ({ data }) => {
  await DataStore.delete(AllWorkSpaces, data);
};

const Confirm = ({ data, open = false, setOpen }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Confirm to delete this Work</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete {data.name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => deletework({ data })}>Yes</Button>
        <Button onClick={() => setOpen(false)}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export const Deletework = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <Fragment>
      <Settings data={data} />
      <IconButton aria-label="delete" size="small" onClick={handleOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Confirm data={data} open={open} setOpen={setOpen} />
    </Fragment>
  );
};
