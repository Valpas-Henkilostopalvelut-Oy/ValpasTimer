import React, { useState, useEffect } from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
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

export const Breakslist = ({ data }) => {
  return (
    data.break !== null &&
    data.break.map((item, i) => (
      <TableRow key={item.start}>
        <TableCell colSpan={2}>{item.start}</TableCell>
        <TableCell colSpan={2}>{item.end}</TableCell>
        <TableCell colSpan={2} align="right">
          <IconButton onClick={() => deleteBreak(data, i)}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  );
};
