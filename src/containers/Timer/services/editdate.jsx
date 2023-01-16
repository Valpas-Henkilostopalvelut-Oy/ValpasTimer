import React from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import {
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  useTheme,
  InputBase,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import fiLocale from "date-fns/locale/fi";
import { PropTypes } from "prop-types";
import { CustomTableCell } from "./tablecell.jsx";

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
      <DatePicker
        disabled={isSent}
        disableFuture
        disableMaskedInput
        label={lang.date}
        value={value}
        onChange={setValue}
        onAccept={(e) => updateDate({ value: e, data: data })}
        renderInput={(params) => {
          const { InputProps, ...otherProps } = params;
          return <InputBase {...otherProps} fullWidth />;
        }}
      />
    </LocalizationProvider>
  );
};

EditDate.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.object,
};
