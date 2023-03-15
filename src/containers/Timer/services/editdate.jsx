import React from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { Typography, InputBase } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import fiLocale from "date-fns/locale/fi";
import { PropTypes } from "prop-types";

const updateDate = async ({ value, data }) => {
  let year = new Date(value).getFullYear();
  let date = new Date(value).getDate();
  let month = new Date(value).getMonth();

  let start = new Date(new Date(data.timeInterval.start).setFullYear(year, month, date)).toISOString();
  let end = new Date(new Date(data.timeInterval.end).setFullYear(year, month, date)).toISOString();

  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.start = start;
      update.timeInterval.end = end;
    })
  ).catch((e) => console.warn(e));
};

export const EditDate = ({ data, lang = { date: "Date" } }) => {
  const [value, setValue] = React.useState(new Date(data.timeInterval.start));
  let sentDate = String(`${value.getDate()}.${value.getMonth() + 1}.${value.getFullYear()}`);
  const isSent = data.isSent;

  return isSent ? (
    <Typography variant="p">{sentDate}</Typography>
  ) : (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fiLocale}>
      <MobileDatePicker
        disabled={isSent}
        disableFuture
        disableMaskedInput
        label={lang.date}
        value={value}
        onChange={setValue}
        onAccept={(e) => updateDate({ value: e, data: data })}
        slots={{
          textField: InputBase,
        }}
      />
    </LocalizationProvider>
  );
};

EditDate.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.object,
};
