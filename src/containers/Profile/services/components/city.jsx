import React from "react";
import { InputBase, TableRow, TableCell, Typography } from "@mui/material";

const Editcity = ({ locale, setLocale }) => {
  return (
    <InputBase
      sx={{
        width: "100%",
        height: "100%",
        borderBottom: "1px solid gray",
        padding: "0 8px",
        fontSize: "14px",
        lineHeight: "1.5",
        transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
        "&:focus": {
          borderColor: "#80bdff",
          outline: "0",
          boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
      }}
      id="city"
      name="city"
      label="City"
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      fullWidth
      variant="standard"
    />
  );
};

export const City = ({ locale, setLocale, edit, lang }) => {
  return (
    <TableRow>
      <TableCell width={"35%"}>{lang.city}</TableCell>
      <TableCell>
        {edit ? (
          <Editcity locale={locale} setLocale={setLocale} />
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
            {locale}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};
