import React, { useEffect, useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  Box,
  Collapse,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Deletework } from "./buttons.jsx";

export const TopbarMD = ({ data, open, handleOpen }) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell align="left">
        <Typography onClick={handleOpen}>{data.name}</Typography>
      </TableCell>
      <TableCell align="right">
        <Deletework data={data} />
      </TableCell>
    </TableRow>
  );
};
