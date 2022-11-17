import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models";
import { TextField, Typography, Button } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ruLocale from "date-fns/locale/ru";

export const Editdate = ({ date = null, setDate, sTime, eTime, setSTime, setETime, lang = { date: "Date" } }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
      <DatePicker
        disableFuture
        label={lang.date}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
          //set new dates to start and end time
          setSTime(
            new Date(
              newValue.getFullYear(),
              newValue.getMonth(),
              newValue.getDate(),
              sTime.getHours(),
              sTime.getMinutes(),
              sTime.getSeconds()
            )
          );
          setETime(
            new Date(
              newValue.getFullYear(),
              newValue.getMonth(),
              newValue.getDate(),
              eTime.getHours(),
              eTime.getMinutes(),
              eTime.getSeconds()
            )
          );
        }}
        renderInput={(params) => <TextField variant="outlined" {...params} />}
      />
    </LocalizationProvider>
  );
};

export const Editstime = ({ sTime, setSTime, lang = { start_time: "Start time" } }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
      <TimePicker
        label={lang.start_time}
        value={sTime}
        onChange={(newValue) => {
          setSTime(newValue);
        }}
        renderInput={(params) => <TextField variant="outlined" {...params} />}
      />
    </LocalizationProvider>
  );
};

export const Edetime = ({ eTime, setETime, lang = { end_time: "End time" } }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
      <TimePicker
        label={lang.end_time}
        value={eTime}
        onChange={(newValue) => {
          setETime(newValue);
        }}
        renderInput={(params) => <TextField variant="outlined" {...params} />}
      />
    </LocalizationProvider>
  );
};

export const Totaltime = ({ sTime, eTime }) => {
  const [total, setTotal] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const diff = eTime.getTime() - sTime.getTime();
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTotal({ hours, minutes, seconds });
    } else {
      setTotal({ hours: 0, minutes: 0, seconds: 0 });
    }
  }, [sTime, eTime]);
  return (
    <Typography variant="h6">
      {total.hours}h {total.minutes}m {total.seconds}s
    </Typography>
  );
};

const createTimeentry = async ({ description = "", sel = "", sTime, eTime }) => {
  sel !== "" &&
    (await Auth.currentAuthenticatedUser()
      .then(async (user) => {
        let userId = user.attributes.sub;
        await DataStore.save(
          new TimeEntry({
            description: description,
            userId: userId,
            workspaceId: sel,
            timeInterval: {
              start: new Date(sTime).toISOString(),
              end: new Date(eTime).toISOString(),
              duration: "",
            },
            isActive: false,
            isLocked: false,
            isSent: false,
            isConfirmed: false,
            billable: false,
            breaks: [],
          })
        ).catch((err) => console.warn(err));
      })
      .catch((err) => {
        console.warn(err);
      }));
};

export const Createtimeentry = ({
  description = "",
  sel = "",
  sTime,
  eTime,
  lang = {
    create: "Create",
  },
}) => {
  const disabled = sel === "" || eTime.getTime() - sTime.getTime() <= 0;

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={() => {
        createTimeentry({ description, sel, sTime, eTime });
      }}
    >
      {lang.create}
    </Button>
  );
};
