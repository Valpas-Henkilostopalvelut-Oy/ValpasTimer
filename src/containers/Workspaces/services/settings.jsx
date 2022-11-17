import React, { useState, Fragment } from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Grid } from "@mui/material";
import { Deletework } from "./deletework.jsx";

export const Settings = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="contained">
        Settings
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth={"xs"}
        fullWidth={true}
      >
        <DialogTitle id="dialog-title">Settings for {data.name}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Deletework data={data} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions disableSpacing={true}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
