import React, { useState, useEffect } from "react";
import { TableCell, TableRow, IconButton, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { PropTypes } from "prop-types";

const addBreak = async (data, sTime, eTime) => {
  const time = new Date().toISOString();

  await DataStore.save(
    TimeEntry.copyOf(data, (updated) => {
      updated.break.push({ start: time, end: null });
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

const Breakstart = ({ item }) => {
  const [start, setStart] = useState(item.start);
  return <Typography>{new Date(start).toLocaleTimeString()}</Typography>;
};

const Breakend = ({ item }) => {
  const [end, setEnd] = useState(item.end);
  return <Typography>{new Date(end).toLocaleTimeString()}</Typography>;
};

export const Breakslist = ({ data }) => {
  return (
    data.break !== null &&
    data.break.map((item, i) => (
      <TableRow key={item.start}>
        <TableCell colSpan={2}>
          <Breakstart item={item} />
        </TableCell>
        <TableCell colSpan={2}>
          <Breakend item={item} />
        </TableCell>
        <TableCell colSpan={2} align="right">
          <IconButton onClick={() => deleteBreak(data, i)}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  );
};
