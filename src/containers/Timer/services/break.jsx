import React, { useState, useEffect } from "react";
import { TableCell, TableRow, IconButton, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TextToTime } from "../../../services/time.jsx";
import AddIcon from "@mui/icons-material/Add";
import { Breakmenu } from "./buttons.jsx";

const addBreak = async (data, reason, time) => {
  //get last timeEntry from array
  const oldData = data[data.length - 1];
  const bStart = oldData.timeInterval.start;
  const bEnd = new Date(Date.parse(oldData.timeInterval.start) + 1000 * 60 * time).toISOString();

  // Save the updated data
  await DataStore.save(
    TimeEntry.copyOf(oldData, (updated) => {
      // Add a new break to the break array
      if (!updated.break) {
        updated.break = [
          {
            reason: reason,
            start: bStart,
            end: bEnd,
          },
        ];
      } else {
        updated.break.push({
          reason: reason,
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
  await DataStore.save(newData);
};

const Breakstart = ({ start, minStart, maxEnd, setStart }) => {
  return (
    <TextToTime
      date={new Date(start)}
      onChange={(t) => {
        setStart(new Date(start).setHours(t.h, t.min, 0, 0));
      }}
      isSent={false}
    />
  );
};

const Breakend = ({ end, minStart, maxEnd, setEnd }) => {
  return (
    <TextToTime
      date={new Date(end)}
      onChange={(t) => setEnd(new Date(end).setHours(t.h, t.min, 0, 0))}
      isSent={false}
    />
  );
};

const Breaktotal = ({ total }) => {
  let hours = String(total.hours).padStart(2, "0");
  let minutes = String(total.minutes).padStart(2, "0");
  return (
    <Typography variant="p">
      {hours}:{minutes}
    </Typography>
  );
};

export const AddBreakMD = ({ data, isEmpty, isDisable, sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <TableRow sx={sx}>
      <TableCell colSpan={7}>
        <IconButton disabled={!isEmpty || isDisable} onClick={handleClick}>
          <AddIcon />
        </IconButton>
        <Breakmenu anchorEl={anchorEl} open={open} data={data} addbreak={addBreak} handleClose={handleClose} />
      </TableCell>
    </TableRow>
  );
};

export const AddBreakSM = ({ data, isEmpty, isDisable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <TableRow>
      <TableCell colSpan={3}>
        <IconButton disabled={!isEmpty || isDisable} onClick={handleClick}>
          <AddIcon />
        </IconButton>
        <Breakmenu anchorEl={anchorEl} open={open} data={data} addbreak={addBreak} handleClose={handleClose} />
      </TableCell>
    </TableRow>
  );
};

export const BreakitemMD = ({ item, data, index, isEmpty, isSent, sx }) => {
  const [end, setEnd] = useState(new Date(item.end));
  const [start, setStart] = useState(new Date(item.start));
  const [total, setTotal] = useState({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    let isActive = false;

    const totalTime = () => {
      const diff = new Date(end).getTime() - new Date(start).getTime();
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
    <TableRow sx={sx}>
      <TableCell colSpan={3} />
      <TableCell align="right">
        <Breakstart start={start} setStart={setStart} /> - <Breakend end={end} setEnd={setEnd} />
      </TableCell>
      <TableCell align="right">
        <Breaktotal total={total} />
      </TableCell>
      <TableCell colSpan={1} align="right">
        <IconButton onClick={() => deleteBreak(data, index)} disabled={!isEmpty || isSent}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const BreakitemSM = ({ item, data, index, isEmpty, isSent }) => {
  const [end, setEnd] = useState(new Date(item.end));
  const [start, setStart] = useState(new Date(item.start));
  const [total, setTotal] = useState({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    let isActive = false;

    const totalTime = () => {
      const diff = new Date(end).getTime() - new Date(start).getTime();
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
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell align="right">
        <Breakstart start={start} setStart={setStart} /> - <Breakend end={end} setEnd={setEnd} />
      </TableCell>
      <TableCell align="right">
        <Breaktotal total={total} />
      </TableCell>
      <TableCell colSpan={1} align="right">
        <IconButton onClick={() => deleteBreak(data, index)} disabled={!isEmpty || isSent}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
