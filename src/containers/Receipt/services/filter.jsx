import React, { useState } from "react";
import {
  Box,
  Grid,
  Popover,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Typography,
  ListItemText,
} from "@mui/material";

export const Filter = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button aria-describedby={id} variant="outlined" onClick={handleClick} fullWidth>
        Suodata
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Form {...props} />
      </Popover>
    </>
  );
};

const Form = (props) => {
  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography variant="h6">Suodata</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Selectworker {...props} />
        </Grid>
      </Grid>
    </Box>
  );
};

const Selectworker = (props) => {
  const { workers, currentWorker, setCurrentWorker } = props;
  const handleChange = (e) => {
    setCurrentWorker(e.target.value);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="select-worker-label">testSelect</InputLabel>
        <Select
          labelId="select-worker-label"
          id="select-worker"
          value={currentWorker}
          label={"testSelect"}
          onChange={handleChange}
        >
          <MenuItem value={""}>
            <ListItemText primary={"Oma"} />
          </MenuItem>
          {workers.map((worker) => {
            console.log(worker);
            return (
              <MenuItem key={worker.id} value={worker.id}>
                <ListItemText primary={`${worker.name} (${worker.status})`} secondary={worker.email} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
