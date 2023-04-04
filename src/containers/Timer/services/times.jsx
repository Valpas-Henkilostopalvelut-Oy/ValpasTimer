import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { InputBase } from "@mui/material";
import fi from "date-fns/locale/fi";

export const Time = ({ time }) => {
  let t = new Date(time);
  let hours = String(t.getHours()).padStart(2, "0");
  let minutes = String(t.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const EditSTime = (props) => {
  const { date } = props;
  const [value, setValue] = useState(new Date(date.timeInterval.start));

  useEffect(() => {
    const updateSTime = async () => {
      try {
        await DataStore.save(
          TimeEntry.copyOf(date, (update) => {
            update.timeInterval.start = value.toISOString();
          })
        );
      } catch (error) {
        console.warn(error);
      }
    };

    updateSTime();
  }, [value]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <DesktopTimePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slots={{ textField: InputBase }}
          sx={{ maxWidth: 36 }}
        />
      </LocalizationProvider>
    </>
  );
};

export const EditETime = (props) => {
  const { date } = props;
  const [value, setValue] = useState(new Date(date.timeInterval.end));

  useEffect(() => {
    const updateETime = async () => {
      try {
        await DataStore.save(
          TimeEntry.copyOf(date, (update) => {
            update.timeInterval.end = value.toISOString();
          })
        );
      } catch (error) {
        console.warn(error);
      }
    };

    updateETime();
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DesktopTimePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slots={{ textField: InputBase }}
        sx={{ maxWidth: 36 }}
      />
    </LocalizationProvider>
  );
};

Time.propTypes = {
  time: PropTypes.string,
};

EditSTime.propTypes = {
  date: PropTypes.object,
};

EditETime.propTypes = {
  date: PropTypes.object,
};
