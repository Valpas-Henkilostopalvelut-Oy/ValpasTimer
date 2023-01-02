import React, { useState, Fragment } from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Grid } from "@mui/material";
import { Deletework } from "./deletework.jsx";
import { ChangeworkName } from "./changename.jsx";
import { PropTypes } from "prop-types";

export const Settings = ({
  data,
  lang = {
    delete: {
      title: "Delete workplace",
      message: "Are you sure you want to delete",
    },
    buttons: {
      delete: "Delete",
      settings: "Settings",
      cancel: "Cancel",
      agree: "Agree",
    },
  },
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="contained">
        {lang.buttons.settings}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth={"xs"}
        fullWidth={true}
      >
        <DialogTitle id="dialog-title">
          {lang.delete.message} {data.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ChangeworkName data={data} />
            </Grid>

            <Grid item container xs={12}>
              <Deletework data={data} handleClose={handleClose} lang={lang} />
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

Settings.propTypes = {
  data: PropTypes.object,
  lang: PropTypes.object,
};
