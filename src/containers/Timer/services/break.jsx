import React, { useState, useEffect } from "react";
import { TableCell, TableRow, IconButton, Typography, InputBase } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { PropTypes } from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import fi from "date-fns/locale/fi";

const addBreak = async (data, sTime, eTime) => {
  //get last timeEntry from array
  const oldData = data[data.length - 1];

  console.log(oldData);

  const newData = TimeEntry.copyOf(oldData, (updated) => {
    // Add a new break to the break array
    let q = [];
    if (updated.break !== null) q = updated.break;
    let bEnd = Date.parse(updated.timeInterval.start) + 1000 * 15 * 60;

    q.push({
      start: new Date(updated.timeInterval.start).toISOString(),
      end: new Date(bEnd).toISOString(),
    });

    updated.break = q;
  });

  // Save the updated data
  await DataStore.save(newData).then((newData) => {
    console.log(newData);
  });
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
          setStart(newValue);
        }}
        renderInput={(params) => {
          return <InputBase {...params} variant="standard" sx={{ fontSize: "14px" }} />;
        }}
        maxTime={new Date(maxEnd)}
        minTime={new Date(minStart)}
      />
    </LocalizationProvider>
  );
};

const Breakend = ({ end, minStart, maxEnd, setEnd }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <TimePicker
        label="End break time"
        value={end}
        onChange={(newValue) => {
          setEnd(newValue);
        }}
        renderInput={(params) => <InputBase {...params} sx={{ fontSize: "14px" }} />}
        maxTime={new Date(maxEnd)}
        minTime={new Date(minStart)}
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

export const Breakslist = ({ item, data, index }) => {
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
    <TableRow key={item.start}>
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
        <IconButton onClick={() => deleteBreak(data, index)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
