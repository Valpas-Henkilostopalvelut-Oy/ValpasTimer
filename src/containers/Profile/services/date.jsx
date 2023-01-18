import React from "react";
import { TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import fi from "date-fns/locale/fi";
import { PropTypes } from "prop-types";

export const Enddate = ({ card }) => {
  let endDate = new Date(card.cardend);
  endDate = `${endDate.getDate()}.${endDate.getMonth() + 1}.${endDate.getFullYear()}`;
  return (
    <Typography variant="body2" color="text.secondary">
      {endDate}
    </Typography>
  );
};

export const SelectEnd = ({ date, setDate, setError, lang }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        disablePast
        disableMaskedInput
        label={lang.cardend}
        value={date}
        onChange={(newValue) => setDate(newValue)}
        onError={(error) => setError(error)}
        renderInput={(params) => <TextField {...params} variant="standard" fullWidth/>}
      />
    </LocalizationProvider>
  );
};

Enddate.propTypes = {
  card: PropTypes.object,
};

SelectEnd.propTypes = {
  date: PropTypes.object,
  setDate: PropTypes.func,
  setError: PropTypes.func,
};
