import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  Popover,
  MenuItem,
  ListItemText,
  Grid,
  TextField,
  InputBase,
  InputLabel,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import fi from "date-fns/locale/fi";

export const AddTimeShift = ({ workers, works }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button aria-describedby={id} variant="contained" color="primary" fullWidth onClick={handleClick}>
        Lisää
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
        <Form close={handleClose} workers={workers} works={works} />
      </Popover>
    </>
  );
};

const Total = ({ start, end }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (start && end) {
      let total = end.getTime() - start.getTime();
      if (total > 0) {
        let hours = Math.floor(total / 1000 / 60 / 60);
        let minutes = Math.floor((total / 1000 / 60 / 60 - hours) * 60);
        setTotal(`${hours}h ${minutes}min`);
      }
    }
  }, [start, end]);

  return <Typography variant="h6">{total}</Typography>;
};

const addshift = async (work, date, start, end, worker) => {
  start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    start.getHours(),
    start.getMinutes()
  ).toISOString();
  end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.getHours(), end.getMinutes()).toISOString();

  return await DataStore.save(
    new TimeEntry({
      description: "",
      userId: worker,
      workspaceId: work,
      timeInterval: {
        start: start,
        end: end,
      },
      isActive: false,
      isLocked: false,
      isSent: true,
      isConfirmed: true,
      isPaused: true,
      pauseStart: null,
      break: [],
      work: null,
    })
  );
};

const Form = ({ close, workers, works }) => {
  const [selected, setSelected] = useState("");
  const [work, setWork] = useState("");
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleCancel = () => {
    close();
  };

  const handleSave = async () => {
    await addshift(work, date, start, end, selected).then(async () => {
      close();
    });
  };

  const isDisabled =
    !selected ||
    !work ||
    isNaN(start) ||
    isNaN(end) ||
    isNaN(date) ||
    !start ||
    !end ||
    !date ||
    Date.parse(start) >= Date.parse(end);

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="workers">Työntekijä</InputLabel>
            <Select
              labelId="workers"
              label="Työntekijä"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              inputProps={{
                name: "workers",
                id: "workers",
              }}
            >
              {workers &&
                workers.map((worker) => (
                  <MenuItem key={worker.id} value={worker.id}>
                    <ListItemText
                      primary={`${worker.first_name} ${worker.last_name} (${worker.status})`}
                      secondary={worker.email}
                    />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="works">Työ</InputLabel>
            <Select
              labelId="works"
              label="Työ"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              inputProps={{
                name: "works",
                id: "works",
              }}
            >
              {works &&
                works.map((work) => (
                  <MenuItem key={work.id} value={work.id}>
                    <ListItemText primary={`${work.name}`} secondary={work.email} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <DatePicker
              disableMaskedInput
              label="Päivämäärä"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <TimePicker
              label="Alkaa"
              value={start}
              onChange={(newValue) => setStart(newValue)}
              disableOpenPicker
              renderInput={(params) => {
                const { InputProps, ...otherParams } = params;
                return (
                  <InputBase
                    {...otherParams}
                    fullWidth
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "0 8px",
                      height: "40px",
                    }}
                  />
                );
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
            <TimePicker
              label="Päättyy"
              value={end}
              disableOpenPicker
              onChange={(newValue) => setEnd(newValue)}
              renderInput={(params) => {
                const { InputProps, ...otherParams } = params;
                return (
                  <InputBase
                    {...otherParams}
                    fullWidth
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "0 8px",
                      height: "40px",
                    }}
                  />
                );
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Total start={start} end={end} />
        </Grid>

        <Grid item xs={6}>
          <Button variant="outlined" color="error" fullWidth onClick={handleCancel}>
            Peruuta
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="outlined" color="error" fullWidth onClick={handleSave} disabled={isDisabled}>
            Lisää
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
