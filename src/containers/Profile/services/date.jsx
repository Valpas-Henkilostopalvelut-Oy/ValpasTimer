import React from "react";
import { TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import fi from "date-fns/locale/fi";

export const Enddate = ({ card }) => {
  let endDate = new Date(card.cardend);
  endDate = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`;
  return (
    <Typography variant="body2" color="text.secondary">
      {endDate}
    </Typography>
  );
};

export const SelectEnd = ({ date, setDate, setError }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        disablePast
        disableMaskedInput
        label="End time"
        value={date}
        onChange={(newValue) => setDate(newValue)}
        onError={(error) => setError(error)}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizationProvider>
  );
};
