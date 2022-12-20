import React, { useState, useEffect } from "react";
import { TableCell, TableRow, IconButton, Typography, InputBase, TextField } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { PropTypes } from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import fi from "date-fns/locale/fi";

const addBreak = async (data) => {
  //get last timeEntry from array
  const oldData = data[data.length - 1];
  const bStart = oldData.timeInterval.start;
  const bEnd = new Date(Date.parse(oldData.timeInterval.start) + 1000 * 60 * 60).toISOString();

  // Save the updated data
  await DataStore.save(
    TimeEntry.copyOf(oldData, (updated) => {
      // Add a new break to the break array
      if (!updated.break) {
        updated.break = [
          {
            start: bStart,
            end: bEnd,
          },
        ];
      } else {
        updated.break.push({
          start: bStart,
          end: bEnd,
        });
      }
    })
  );
};

const deleteBreak = async (data, breakIndex) => {
  const newData = TimeEntry.copyOf(data, (updated) => {
    // Remove the break at the specified index from the break array
    updated.break = updated.break.filter((_, index) => index !== breakIndex);
  });

  // Save the updated data
  await DataStore.save(newData).then((newData) => {
    console.log(newData);
  });
};

const Breakstart = ({ start, minStart, maxEnd, setStart }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <TimePicker
        disableOpenPicker
        label="Start break time"
        value={start}
        onChange={(newValue) => {
          console.log(newValue);
          setStart(newValue);
        }}
        renderInput={(params) => <TextField {...params} variant="standard" sx={{ fontSize: "14px" }} />}
      />
    </LocalizationProvider>
  );
};

const Breakend = ({ end, minStart, maxEnd, setEnd }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <TimePicker
        disableOpenPicker
        label="End break time"
        value={end}
        onChange={(newValue) => {
          setEnd(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="standard" sx={{ fontSize: "14px" }} onBlur={() => console.log(params)} />
        )}
      />
    </LocalizationProvider>
  );
};

const Breaktotal = ({ total }) => {
  return (
    <Typography variant="subtitle2">
      {total.hours}h {total.minutes}m
    </Typography>
  );
};

export const AddBreak = ({ data }) => {
  return (
    <TableRow>
      <TableCell colSpan={7}>
        <IconButton onClick={() => addBreak(data)}>
          <AddIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const Breakslist = ({ item, data, index, isEmpty }) => {
  console.log(item);
  const [end, setEnd] = useState(new Date(item.end));
  const [start, setStart] = useState(new Date(item.start));
  const [total, setTotal] = useState({
    hours: 0,
    minutes: 0,
  });
  const dStart = data.timeInterval.start;
  const dEnd = data.timeInterval.end;

  useEffect(() => {
    let isActive = false;

    const totalTime = () => {
      const diff = end.getTime() - start.getTime();
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTotal({ hours, minutes, seconds });
      } else {
        setTotal({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    if (!isActive && end && start) {
      totalTime();
    }

    return () => (isActive = true);
  }, [end, start]);

  return (
    <TableRow key={index}>
      <TableCell colSpan={2}>
        <Breakstart start={start} setStart={setStart} minStart={dStart} maxEnd={dEnd} />
      </TableCell>
      <TableCell colSpan={2}>
        <Breakend end={end} setEnd={setEnd} minStart={dStart} maxEnd={dEnd} />
      </TableCell>
      <TableCell colSpan={1}>
        <Breaktotal total={total} />
      </TableCell>
      <TableCell colSpan={1} align="right">
        <IconButton onClick={() => deleteBreak(data, index)} disabled={!isEmpty}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
