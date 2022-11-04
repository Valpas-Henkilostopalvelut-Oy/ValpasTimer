import React, { useState, Fragment } from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";

export const Settings = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="contained">
        Settings
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <DialogTitle id="dialog-title">Settings for {data.name}</DialogTitle>
        <DialogContent>Comming soon</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
