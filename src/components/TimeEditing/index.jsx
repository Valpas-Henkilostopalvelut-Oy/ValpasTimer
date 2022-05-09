import { TextField, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useState, Fragment, forwardRef } from "react";
import { timeMaker } from "../../services/time";

export const TimeEditing = ({ time, onChange, isManual = false, isSent = false, isAdmin = false }) => {
  const d = new Date(time);
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(
    `${String("0" + d.getHours()).slice(-2)}:${String("0" + d.getMinutes()).slice(-2)}`
  );

  return isSent || isAdmin || isManual ? (
    <Fragment>
      <TextField
        sx={{ width: 42 }}
        variant="standard"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onBlur={(event) => {
          let val = timeMaker(event, time);
          setOpen(true);
          setValue(`${String("0" + val.h).slice(-2)}:${String("0" + val.m).slice(-2)}`);
          return onChange(val);
        }}
      />
      <Success open={open} setOpen={setOpen} />
    </Fragment>
  ) : (
    <Typography variant="p">{value}</Typography>
  );
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//success edited time
const Success = ({ open = false, setOpen = () => {} }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        Time edited successfully
      </Alert>
    </Snackbar>
  );
};
