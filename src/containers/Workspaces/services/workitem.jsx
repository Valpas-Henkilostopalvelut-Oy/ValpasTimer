import React, { useState } from "react";
import { TableRow, TableCell, Grid, Collapse, Box, IconButton, Typography } from "@mui/material";
import { AllWorkSpaces } from "../../../models";
import { DataStore } from "aws-amplify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Workitem = ({ item, data }) => {
  return (
    <TableRow>
      <TableCell align="left">{item.name}</TableCell>
      <TableCell align="right">{item.description}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete" onClick={() => deleteWork(item.id, data)}>
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const deleteWork = async (id, data) => {
  const work = data.work.filter((item) => item.id !== id);

  await DataStore.save(
    AllWorkSpaces.copyOf(data, (updated) => {
      updated.work = work;
    })
  )
  .catch((err) => console.log(err));
};
