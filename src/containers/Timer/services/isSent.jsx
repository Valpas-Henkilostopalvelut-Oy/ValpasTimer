import React, { Fragment } from "react";
import { ReportAll, DeleteAll } from "./buttons.jsx";
import { TableRow, TableCell, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

export const IsSentSM = ({
  date,
  lang = {
    sent: "Sent",
    confirmed: "Confirmed",
  },
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
        <ReportAll date={date} lang={lang} />
        <DeleteAll date={date} lang={lang} />
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
      <TableCell align="center" colSpan={2}>
        {lang.sent}: <CheckCircleIcon color="success" />
      </TableCell>
      <TableCell align="center" colSpan={2}>
        {lang.confirmed}: <CheckCircleIcon color="success" />
      </TableCell>
    </TableRow>
  );
};

export const IsSentMD = ({
  date,
  lang = {
    sent: "Sent",
    confirmed: "Confirmed",
  },
}) => {
  const theme = useTheme();

  return sent(date) ? (
    <Fragment>
      <TableCell
        align="center"
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        <ReportAll date={date} lang={lang} />
      </TableCell>
      <TableCell
        align="center"
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        <DeleteAll date={date} lang={lang} />
      </TableCell>
    </Fragment>
  ) : (
    <Fragment>
      <TableCell
        align="right"
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        {lang.sent}: <CheckCircleIcon color="success" />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        {lang.confirmed}: {confirmed(date) ? <CheckCircleIcon color="success" /> : "No"}
      </TableCell>
    </Fragment>
  );
};
