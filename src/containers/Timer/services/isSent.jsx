/* eslint-disable no-unused-vars */
import React from "react";
import { DeleteAll } from "./buttons.jsx";
import { TableRow, TableCell, useTheme, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { PropTypes } from "prop-types";

const sent = (date) => {
  let isSent = date.arr.filter((e) => e.isSent).length;
  let isNotSent = date.arr.length;

  return isSent !== isNotSent;
};

const confirmed = (date) => {
  let isConfirmed = date.arr.filter((e) => e.isConfirmed).length;
  let isNotConfirmed = date.arr.length;

  return isConfirmed === isNotConfirmed;
};

export const StatusSM = ({
  date,
  lang = {
    sent: "Sent",
    confirmed: "Confirmed",
  },
  isEmpty,
}) => {
  const theme = useTheme();

  return sent(date) ? (
    <TableRow
      sx={{
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <TableCell align="center" colSpan={4}>
        <DeleteAll date={date} lang={lang} isEmpty={isEmpty} />
      </TableCell>
    </TableRow>
  ) : (
    <TableRow
      sx={{
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <TableCell align="center" colSpan={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {lang.sent}: <TaskAltIcon color="success" />
          {lang.confirmed}: {confirmed(date) ? <TaskAltIcon color="success" /> : <ClearIcon color="error" />}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export const StatusMD = ({
  date,
  lang = {
    sent: "Sent",
    confirmed: "Confirmed",
  },
  isEmpty,
}) => {
  const theme = useTheme();
  return sent(date) ? (
    <TableCell
      align="right"
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      <DeleteAll date={date} lang={lang} isEmpty={isEmpty} />
    </TableCell>
  ) : (
    <TableCell
      align="right"
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {lang.sent}: <TaskAltIcon color="success" />
        {lang.confirmed}: {confirmed(date) ? <TaskAltIcon color="success" /> : <ClearIcon color="error" />}
      </Box>
    </TableCell>
  );
};

StatusMD.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
};

StatusSM.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
};
