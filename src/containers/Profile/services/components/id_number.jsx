import React from "react";
import { InputBase, TableRow, TableCell, Typography } from "@mui/material";

const Editid = ({ idnumber, setIdnumber }) => {
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
      id="idnumber"
      name="idnumber"
      label="ID number"
      value={idnumber}
      onChange={(e) => setIdnumber(e.target.value)}
      fullWidth
      variant="standard"
    />
  );
};

export const Idnumber = ({ edit, idnumber, setIdnumber, lang }) => {
  return (
    <TableRow>
      <TableCell width={"35%"}>{lang.idnumber}</TableCell>
      <TableCell>
        {edit ? (
          <Editid idnumber={idnumber} setIdnumber={setIdnumber} />
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
            {idnumber}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};
