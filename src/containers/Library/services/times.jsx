import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Box, TextField } from "@mui/material";
import fi from "date-fns/locale/fi";

export const shiftdate = (date) => {
  let d = new Date(date);
  /* example: return 23.1.2023 */
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

export const Startdaytime = ({ date }) => {
  date.sort((a, b) => {
    let dsa = new Date(a.timeshift.timeInterval.start);
    let dsb = new Date(b.timeshift.timeInterval.start);
    return dsa - dsb;
  });

  const start = new Date(date[0].timeshift.timeInterval.start);
  let h = start.getHours();
  h = String(h).padStart(2, "0");
  let m = start.getMinutes();
  m = String(m).padStart(2, "0");

  return <Typography variant="p">{`${h}:${m}`}</Typography>;
};

export const Enddaytime = ({ date }) => {
  date.sort((a, b) => {
    let dsa = new Date(a.timeshift.timeInterval.start);
    let dsb = new Date(b.timeshift.timeInterval.start);
    return dsb - dsa;
  });

  const end = new Date(date[0].timeshift.timeInterval.end);
  let h = end.getHours();
  h = String(h).padStart(2, "0");
  let m = end.getMinutes();
  m = String(m).padStart(2, "0");

  return <Typography variant="p">{`${h}:${m}`}</Typography>;
};

export const Time = ({ time }) => {
  time = new Date(time);
  let h = time.getHours();
  h = String(h).padStart(2, "0");
  let m = time.getMinutes();
  m = String(m).padStart(2, "0");
  return <Typography variant="p">{`${h}:${m}`}</Typography>;
};

export const Daterangestart = ({
  filter = {
    paid: false,
    all: true,
    start: new Date(),
    end: new Date(),
  },
  setFilter,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        label="Start"
        value={filter.start}
        disableMaskedInput
        onChange={(newValue) => {
          setFilter({ ...filter, start: newValue });
        }}
        renderInput={(params) => <TextField variant="standard" {...params} />}
      />
    </LocalizationProvider>
  );
};

export const Daterangeend = ({
  filter = {
    paid: false,
    all: true,
    start: new Date(),
    end: new Date(),
  },
  setFilter,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        label="End"
        value={filter.end}
        disableMaskedInput
        onChange={(newValue) => {
          setFilter({ ...filter, end: newValue });
        }}
        renderInput={(params) => <TextField variant="standard" {...params} />}
      />
    </LocalizationProvider>
  );
};
