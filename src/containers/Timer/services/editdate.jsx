import React from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
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

export const EditDate = ({ date, lang = { date: "Date" } }) => {
  const [value, setValue] = React.useState(new Date(date.timeInterval.start));
  const [open, setOpen] = React.useState(false);
  const isSent = date.isSent;
  const handleClose = () => {
    updateDate({ value: value, data: date });
    setOpen(false);
  };

  return (
    <>
      <Typography variant="p" onClick={() => setOpen(true)}>
        {new Date(date.timeInterval.start).getDate()}.{new Date(date.timeInterval.start).getMonth()}.
        {new Date(date.timeInterval.start).getFullYear()}
      </Typography>
      <Dialog open={open && !isSent} onClose={() => setOpen(false)} maxWidth={"xs"} fullWidth={true}>
        <DialogTitle>{lang.date}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
            <DatePicker
              label={lang.date}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => {
                return <TextField {...params} variant="standard" fullWidth />;
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
