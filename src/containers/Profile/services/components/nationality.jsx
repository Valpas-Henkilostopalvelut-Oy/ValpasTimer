import React from "react";
import { TextField, InputBase, TableRow, TableCell, Typography, Autocomplete } from "@mui/material";
import { country } from "./country";

const Editnational = ({ national, setNational }) => {
  const [value, setValue] = React.useState(national);
  /* Country select */
  return (
    <Autocomplete
      id="national"
      name="national"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onInputChange={(event, newValue) => setNational(newValue)}
      options={country}
      getOptionLabel={(option) => option}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} variant="standard" />}
    />
  );
};

export const Nationality = ({ edit, national, setNational, lang }) => {
  return (
    <TableRow>
      <TableCell width={"35%"}>{lang.nationality}</TableCell>
      <TableCell>
        {edit ? (
          <Editnational national={national} setNational={setNational} />
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
            {national}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};
