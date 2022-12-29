import React, { useState, useEffect } from "react";
import { TableCell, TableRow, IconButton, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry, Breakreason } from "../../../models/index.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TextToTime } from "../../../services/time.jsx";
import AddIcon from "@mui/icons-material/Add";
import { Breakmenu } from "./buttons.jsx";

const updateBreak = async (data, item, reason) => {
  const newData = {
    id: item.id,
    start: item.start,
    end: item.end,
    reason: reason,
  };
  const oldBreak = data.break.filter((item) => item.id !== newData.id);
  const newBreak = [...oldBreak, newData];

  await DataStore.save(
    TimeEntry.copyOf(data, (updated) => {
      updated.break = newBreak;
    })
  );
};

const Breakreasonselect = ({ data, item }) => {
  const breaks = [
    { id: Breakreason.DINNER, name: "Dinner" },
    { id: Breakreason.LUNCH, name: "Lunch" },
    { id: Breakreason.SHORT, name: "Short" },
    { id: Breakreason.LONG, name: "Long" },
    { id: Breakreason.GOING, name: "Going" },
  ];
  const [reason, setReason] = useState(item.reason);

  const handleChange = (event) => {
    setReason(event.target.value);
    updateBreak(data, item, event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="breakreason-select-label">Breakreason</InputLabel>
      <Select
        labelId="breakreason-select-label"
        id="breakreason-select"
        value={reason}
        label="Breakreason"
        onChange={handleChange}
        variant="standard"
      >
        {breaks.map((e) => {
          return (
            <MenuItem value={e.id} key={e.id}>
              <Typography variant="p">{e.name}</Typography>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const updateStartBreak = async (data, item, time) => {
  const newTime = new Date(new Date(item.start).setHours(time.h, time.min, 0, 0)).toISOString();
  const newData = {
    id: item.id,
    reason: item.reason,
    start: newTime,
    end: item.end,
  };

  const oldBreak = data.break.filter((item) => item.id !== newData.id);
  const newBreak = [...oldBreak, newData];
  await DataStore.save(
    TimeEntry.copyOf(data, (updated) => {
      updated.break = newBreak;
    })
  );
};

const updateEndBreak = async (data, item, time) => {
  const newTime = new Date(new Date(item.end).setHours(time.h, time.min, 0, 0)).toISOString();
  const newData = {
    id: item.id,
    reason: item.reason,
    start: item.start,
    end: newTime,
  };

  const oldBreak = data.break.filter((item) => item.id !== newData.id);
  const newBreak = [...oldBreak, newData];
  await DataStore.save(
    TimeEntry.copyOf(data, (updated) => {
      updated.break = newBreak;
    })
  );
};

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
            id: String(Date.now()),
            reason: reason,
            start: bStart,
            end: bEnd,
          },
        ];
      } else {
        updated.break.push({
          id: String(Date.now()),
          reason: reason,
          start: bStart,
          end: bEnd,
        });
      }
    })
  ).then((e) => console.log(e));
};

const deleteBreak = async (data, item) => {
  const newData = TimeEntry.copyOf(data, (updated) => {
    // Remove the break at the specified index from the break array
    updated.break = updated.break.filter((breakItem) => breakItem.id !== item.id);
  });

  // Save the updated data
  await DataStore.save(newData);
};

const Breakstart = ({ start, setStart, data, item, isDisable }) => {
  return (
    <TextToTime
      date={new Date(start)}
      onChange={(t) => {
        updateStartBreak(data, item, t);
        setStart(new Date(start).setHours(t.h, t.min, 0, 0));
      }}
      isSent={isDisable}
    />
  );
};

const Breakend = ({ end, setEnd, data, item, isDisable }) => {
  return (
    <TextToTime
      date={new Date(end)}
      onChange={(t) => {
        updateEndBreak(data, item, t);
        setEnd(new Date(end).setHours(t.h, t.min, 0, 0));
      }}
      isSent={isDisable}
      onBlur={(e) => console.log(e)}
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

export const AddBreakSM = ({ data, isEmpty, isDisable, sx }) => {
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
      <TableCell colSpan={3}>
        <IconButton disabled={!isEmpty || isDisable} onClick={handleClick}>
          <AddIcon />
        </IconButton>
        <Breakmenu anchorEl={anchorEl} open={open} data={data} addbreak={addBreak} handleClose={handleClose} />
      </TableCell>
    </TableRow>
  );
};

export const BreakitemMD = ({ item, data, isEmpty, sx }) => {
  const [end, setEnd] = useState(new Date(item.end));
  const [start, setStart] = useState(new Date(item.start));
  const [total, setTotal] = useState({
    hours: 0,
    minutes: 0,
  });
  const isSent = data.isSent;

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
      <TableCell />
      <TableCell colSpan={2}>
        <Breakreasonselect item={item} data={data} />
      </TableCell>
      <TableCell align="right">
        <Breakstart start={start} setStart={setStart} item={item} data={data} isDisable={isSent} />
        {" - "}
        <Breakend end={end} setEnd={setEnd} item={item} data={data} isDisable={isSent} />
      </TableCell>
      <TableCell align="right">
        <Breaktotal total={total} />
      </TableCell>
      <TableCell colSpan={1} align="right">
        <IconButton onClick={() => deleteBreak(data, item)} disabled={!isEmpty || isSent}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const BreakitemSM = ({ item, data, isEmpty, sx }) => {
  const [end, setEnd] = useState(new Date(item.end));
  const [start, setStart] = useState(new Date(item.start));
  const [total, setTotal] = useState({
    hours: 0,
    minutes: 0,
  });
  const isSent = data.isSent;

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
    <>
      <TableRow sx={sx}>
        <Breakreasonselect item={item} data={data} />
      </TableRow>
      <TableRow sx={sx}>
        <TableCell align="right">
          <Breakstart start={start} setStart={setStart} item={item} data={data} isDisable={isSent} />
          {" - "}
          <Breakend end={end} setEnd={setEnd} item={item} data={data} isSent isDisable={isSent} />
        </TableCell>
        <TableCell align="right">
          <Breaktotal total={total} />
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => deleteBreak(data, item)} disabled={!isEmpty || isSent}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};
