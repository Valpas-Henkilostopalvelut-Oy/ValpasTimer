import React, { useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models/index.js";
import { Typography, Button, Box, Collapse, Grid } from "@mui/material";
import { PropTypes } from "prop-types";

const deletework = async (data, close) => {
  await DataStore.delete(AllWorkSpaces, data);
};

export const Deletework = ({
  data,
  handleClose,
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
  const handleOpen = () => setOpen(!open);
  return (
    <Grid item container spacing={1}>
      <Grid item container spacing={1}>
        <Grid item xs={9}>
          <Typography>{lang.delete.title}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Button color="error" variant="contained" onClick={handleOpen} fullWidth>
            {lang.buttons.delete}
          </Button>
        </Grid>
      </Grid>

      <Grid item>
        <Collapse in={open}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>
                {lang.delete.message} {data.name}?
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Button color="primary" variant="contained" onClick={handleOpen} fullWidth>
                {lang.buttons.cancel}
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                fullWidth
                color="error"
                variant="contained"
                onClick={() => {
                  handleClose();
                  deletework(data);
                }}
              >
                {lang.buttons.agree}
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
};

Deletework.propTypes = {
  data: PropTypes.object,
  handleClose: PropTypes.func,
  lang: PropTypes.object,
};
