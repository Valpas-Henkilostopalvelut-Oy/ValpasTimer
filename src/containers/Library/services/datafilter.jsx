import React, { useState } from "react";
import {
  Divider,
  Box,
  Grid,
  Popover,
  MenuItem,
  Button,
  ListItemText,
  Checkbox,
  ListSubheader,
  Select,
  FormControl,
  InputLabel,
  InputBase,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Daterangestart, Daterangeend } from "./times";
import { PropTypes } from "prop-types";
import { TimeEntry } from "../../../models";
import { DataStore } from "aws-amplify";

const Worker = ({ workers, filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter({ ...filter, workerId: event.target.value });
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Worker</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter.workerId}
        label="Worker"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {workers.map((worker) => (
          <MenuItem key={worker.id} value={worker.id}>
            {worker.first_name} {worker.last_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Work = ({ works, filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter({ ...filter, workId: event.target.value });
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Work</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter.workId}
        label="Work"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {works.map((work) => (
          <MenuItem key={work.id} value={work.id}>
            {work.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const Filter = ({
  oldFilter = {
    workerId: "",
    workId: "",
    paid: false,
    all: true,
    start: new Date(),
    end: new Date(),
  },
  setOldFilter,
  works,
  workers,
}) => {
  const [filter, setFilter] = useState(oldFilter);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "long-menu" : undefined;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleUpdate = () => {
    setOldFilter(filter);
    handleClose();
  };
  const handleCancel = () => {
    setFilter({
      workerId: "",
      workId: "",
      paid: false,
      all: true,
      start: new Date(),
      end: new Date(),
    });
    setOldFilter({
      workerId: "",
      workId: "",
      paid: false,
      all: true,
      start: new Date(),
      end: new Date(),
    });
    handleClose();
  };

  return (
    <Box>
      <Button
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        fullWidth
      >
        Filter
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
        <Form
          filter={filter}
          setFilter={setFilter}
          works={works}
          workers={workers}
          cancel={handleCancel}
          save={handleUpdate}
        />
      </Popover>
    </Box>
  );
};

const Form = ({ filter, setFilter, works, workers, cancel, save }) => {
  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Worker workers={workers} filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={12}>
          <Work works={works} filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={12}>
          <MenuItem onClick={() => setFilter({ ...filter, paid: !filter.paid })}>
            <Checkbox checked={filter.paid} onChange={() => setFilter({ ...filter, paid: !filter.paid })} />
            <ListItemText primary="Maksu odottaa" />
          </MenuItem>
        </Grid>
        <Grid item xs={12}>
          <MenuItem onClick={() => setFilter({ ...filter, all: !filter.all })}>
            <Checkbox checked={filter.all} onChange={() => setFilter({ ...filter, all: !filter.all })} />
            <ListItemText primary="Kaikki" />
          </MenuItem>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">Aikaväli</Typography>
        </Grid>
        <Grid item xs={12}>
          <Daterangestart filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={12}>
          <Daterangeend filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="error" onClick={cancel} fullWidth>
            Peruuta
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="success" onClick={save} fullWidth>
            Tallenna
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
