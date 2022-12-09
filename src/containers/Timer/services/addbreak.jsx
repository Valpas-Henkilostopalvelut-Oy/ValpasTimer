import React from "react";
import { Typography, MenuItem, Box } from "@mui/material";

const addBreak = (data, handleClose) => {};

const AddBreak = ({ data, lang = { addBreak: "Add Break" }, isEmpty, handleClose }) => {
  return (
    <MenuItem onClick={() => addBreak(data, handleClose())} disabled={!isEmpty}>
      <Typography variant="p">{lang.buttons.send}</Typography>
    </MenuItem>
  );
};
