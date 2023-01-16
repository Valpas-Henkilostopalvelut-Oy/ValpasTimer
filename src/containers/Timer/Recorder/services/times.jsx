/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models/index.js";
import { TextField, Typography, Button, Box } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import fi from "date-fns/locale/fi";
import { timeMaker } from "../../../../services/time.jsx";
import { PropTypes } from "prop-types";
import { SnackSuccess } from "../../../../components/Alert/index.jsx";

export const Editdate = ({ date = null, setDate, sTime, eTime, setSTime, setETime, lang = { date: "Date" } }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        disableMaskedInput
        disableFuture
        label={lang.date}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
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

const isInvalid = (timeStart, timeEnd, minRage, maxRange) => {
  if (timeStart.getTime() >= minRage.getTime() && timeStart.getTime() <= maxRange.getTime()) {
    return true;
  }
  return false;
};

export const Edittime = ({
  date,
  time,
  time2,
  setTime,
  label = "Time",
  maxTime = null,
  minTime = null,
  error,
  setError,
}) => {
  let hours = String(new Date(time).getHours()).padStart(2, "0");
  let minutes = String(new Date(time).getMinutes()).padStart(2, "0");
  const [value, setValue] = useState(`${hours}:${minutes}`);
  const [lastValidTime, setLastValidTime] = useState(time);

  useEffect(() => {
    if (isInvalid(new Date(time), time2, minTime, maxTime)) {
      setTime(lastValidTime);
    } else {
      setLastValidTime(time);
    }
  }, [time, minTime, maxTime]);

  useEffect(() => {
    setValue(`${hours}:${minutes}`);
  }, [time]);

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      error={error}
      onChange={(e) => {
        const { value } = e.target;
        setValue(value);
      }}
      onBlur={(e) => {
        let hours = String(timeMaker(e, time).h).padStart(2, "0");
        let minutes = String(timeMaker(e, time).m).padStart(2, "0");
        const selectedTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0);
        if (isInvalid(selectedTime, time2, minTime, maxTime)) {
          setError(true);
          return;
        }
        setError(false);
        setTime(selectedTime);
        setValue(`${hours}:${minutes}`);
      }}
    />
  );
};

export const Totaltime = ({ sTime = null, eTime = null }) => {
  const [total, setTotal] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    let isActive = false;

    const totalTime = () => {
      const diff = eTime.getTime() - sTime.getTime();
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTotal({ hours, minutes, seconds });
      } else {
        setTotal({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    if (!isActive && sTime && eTime) {
      totalTime();
    }

    return () => (isActive = true);
  }, [sTime, eTime]);

  const h = String(total.hours).padStart(2, "0");
  const m = String(total.minutes).padStart(2, "0");

  //Typography chenter in box

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="p">
        {h}:{m}
      </Typography>
    </Box>
  );
};

const createTimeentry = async ({ description = "", sel = "", sTime, eTime, workit }) => {
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
            },
            work: workit,
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
  error,
  setDescription,
  setETime,
  setSTime,
  setWorkit,
  setSel,
  description = "",
  sel = "",
  sTime,
  eTime,
  workit,
  lang = {
    create: "Create",
  },
}) => {
  const disabled = sel === "" || eTime.getTime() - sTime.getTime() <= 0;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={disabled || error}
        onClick={() => {
          createTimeentry({ description, sel, sTime, eTime, workit }).then(() => {
            setDescription("");
            setETime(new Date());
            setSTime(new Date());
            setOpen(true);
          });
        }}
      >
        {lang.create}
      </Button>

      <SnackSuccess open={open} setOpen={setOpen} message="Success" />
    </>
  );
};
Editdate.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func,
  sTime: PropTypes.instanceOf(Date),
  setSTime: PropTypes.func,
  eTime: PropTypes.instanceOf(Date),
  setETime: PropTypes.func,
  lang: PropTypes.object,
};

Edittime.propTypes = {
  date: PropTypes.instanceOf(Date),
  time: PropTypes.instanceOf(Date),
  time2: PropTypes.instanceOf(Date),
  setTime: PropTypes.func,
  label: PropTypes.string,
  maxTime: PropTypes.instanceOf(Date),
  minTime: PropTypes.instanceOf(Date),
  error: PropTypes.bool,
  setError: PropTypes.func,
};

Totaltime.propTypes = {
  sTime: PropTypes.instanceOf(Date),
  eTime: PropTypes.instanceOf(Date),
};

Createtimeentry.propTypes = {
  error: PropTypes.bool,
  setDescription: PropTypes.func,
  setETime: PropTypes.func,
  setSTime: PropTypes.func,
  setWorkit: PropTypes.func,
  setSel: PropTypes.func,
  description: PropTypes.string,
  sel: PropTypes.string,
  sTime: PropTypes.instanceOf(Date),
  eTime: PropTypes.instanceOf(Date),
  workit: PropTypes.object,
  lang: PropTypes.object,
};
