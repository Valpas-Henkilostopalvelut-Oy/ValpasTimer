/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry } from "../../../../models/index.js";
import { Typography, Button, Box } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker, TimeField, LocalizationProvider } from "@mui/x-date-pickers";
import {} from "@mui/x-date-pickers";
import fi from "date-fns/locale/fi";
import { PropTypes } from "prop-types";

export const Editdate = ({ date = null, setDate, lang = { date: "Date" } }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <MobileDatePicker
        disableMaskedInput
        disableFuture
        label={lang.date}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
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

export const Edittime = ({ time, setTime, label = "Time", setError }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <TimeField
        label={label}
        value={time}
        onChange={(newValue) => {
          setTime(newValue);
          if (!(isNaN(newValue) || newValue === null)) setError(false);
        }}
        onError={(error) => setError(isNaN(error) || error === null)}
      />
    </LocalizationProvider>
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

const createTimeentry = async (description = "", sel = "", sTime, eTime, workit, date = new Date()) => {
  sTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), sTime.getHours(), sTime.getMinutes(), 0);
  eTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), eTime.getHours(), eTime.getMinutes(), 0);
  return (
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
      }))
  );
};

export const Createtimeentry = (props) => {
  const [open, setOpen] = useState(false);

  const {
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
    lang = { create: "Create" },
    date,
  } = props;

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={error || sel === ""}
      onClick={async () => {
        await createTimeentry(description, sel, sTime, eTime, workit, date).then(() => {
          setDescription("");
          setETime(new Date());
          setSTime(new Date());
          setOpen(true);
        });
      }}
    >
      {lang.create}
    </Button>
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
