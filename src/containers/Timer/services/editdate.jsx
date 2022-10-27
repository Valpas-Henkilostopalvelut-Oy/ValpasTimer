import React from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ruLocale from "date-fns/locale/ru";

const updateDate = async ({ value, data }) => {
  let year = new Date(value).getUTCFullYear();
  let date = new Date(value).getUTCDate();
  let month = new Date(value).getUTCMonth();

  let start = new Date(new Date(data.timeInterval.start).setUTCFullYear(year, month, date)).toISOString();
  let end = new Date(new Date(data.timeInterval.end).setUTCFullYear(year, month, date)).toISOString();

  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.start = start;
      update.timeInterval.end = end;
    })
  ).catch((e) => console.warn(e));
};

export const EditDate = ({ date }) => {
  const [value, setValue] = React.useState(new Date(date.timeInterval.start));
  const isSent = date.isSent;

  return !isSent ? (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
      <DatePicker
        label="Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          updateDate({ value: newValue, data: date });
        }}
        renderInput={(params) => {
          return <TextField {...params} variant="standard" />;
        }}
      />
    </LocalizationProvider>
  ) : (
    <Typography variant="p">{new Date(date.timeInterval.start).getDate()}.{new Date(date.timeInterval.start).getMonth()}.{new Date(date.timeInterval.start).getFullYear()}</Typography>
  );
};
