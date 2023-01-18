import React from "react";
import { InputBase, TableRow, TableCell, Typography } from "@mui/material";

const Editiban = ({ iban, setIban }) => {
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
      id="iban"
      name="iban"
      label="IBAN"
      value={iban}
      onChange={(e) => setIban(e.target.value)}
      fullWidth
      variant="standard"
    />
  );
};

export const IBAN = ({ iban, setIban, edit, lang }) => {
  return (
    <TableRow>
      <TableCell width={"35%"}>{lang.iban}</TableCell>
      <TableCell>
        {edit ? (
          <Editiban iban={iban} setIban={setIban} />
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
            {iban}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};
