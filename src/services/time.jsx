import React, { useState } from "react";
import {
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  InputBase,
} from "@mui/material";
import { PropTypes } from "prop-types";

export const timeMaker = (event, time) => {
  if (event !== null) {
    var val = event.target.value;
  }

  const arr = val.split("").filter((t) => t !== ":");

  if (arr.length === 1) {
    let h = String(arr[0]);
    let min = 0;

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 2) {
    let h = String(arr[0] + arr[1]);
    let min = 0;

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 3) {
    let h = String(arr[0]);
    let min = String(arr[1] + arr[2]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    return { h: Number(h), m: Number(min) };
  } else if (arr.length === 4) {
    let h = String(arr[0] + arr[1]);
    let min = String(arr[2] + arr[3]);

    if (Number(min) > 60) {
      Number(h++);
      min = Number(min - 60);
    }

    return { h: Number(h), m: Number(min) };
  } else {
    let d = new Date(time);

    return { h: Number(d.getUTCHours()), m: Number(d.getUTCMinutes()) };
  }
};

export const TextToTime = ({ date = new Date(), onChange, isSent = true }) => {
  const [time, setTime] = useState(
    `${String("0" + new Date(date).getHours()).slice(-2)}:${String("0" + new Date(date).getMinutes()).slice(-2)}`
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({ h: 0, m: 0 });
  const handleSave = () => {
    onChange({ h: value.h, min: value.m });
    setOpen(false);
  };

  return (
    <>
      <Typography
        onClick={() => setOpen(true)}
        variant="p"
        sx={{
          cursor: !isSent ? "pointer" : "default",
        }}
      >
        {time}
      </Typography>
      <Dialog open={open && !isSent} onClose={() => setOpen(false)} maxWidth="xs" fullWidth={true}>
        <DialogTitle>Time</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Time"
            margin="normal"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                let val = timeMaker(e, time);
                setTime(`${String("0" + val.h).slice(-2)}:${String("0" + val.m).slice(-2)}`);
                setValue(val);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

TextToTime.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  isSent: PropTypes.bool,
};
