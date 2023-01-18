import React from "react";
import { InputBase, TableRow, TableCell, Typography, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fi from "date-fns/locale/fi";
const Editbirthdate = ({ birthdate, setBirthdate }) => {
  birthdate = new Date(String(birthdate).split("/").reverse().join("-"));
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <DatePicker
        label="Birthdate"
        value={birthdate}
        onChange={(newValue) => {
          setBirthdate(newValue);
        }}
        disableMaskedInput
        renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
      />
    </LocalizationProvider>
  );
};

export const Birthdate = ({ birthdate, setBirthdate, edit, lang }) => {
  return (
    <TableRow>
      <TableCell width={"35%"}>{lang.birthdate}</TableCell>
      <TableCell>
        {edit ? (
          <Editbirthdate birthdate={birthdate} setBirthdate={setBirthdate} />
        ) : (
          <Typography
            variant="body2"
            sx={{
              borderBottom: "1px solid #fff",
              padding: "4px 8px 5px 8px",
              fontSize: "14px",
              lineHeight: "1.5",
              transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
            }}
          >
            {birthdate}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};
