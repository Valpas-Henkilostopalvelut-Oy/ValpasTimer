import React from "react";
import { TableCell, TableRow, useTheme, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Deletework } from "./buttons.jsx";

export const TopbarMD = ({ data, open, handleOpen }) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell
        sx={{
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell align="left">
        <Typography onClick={handleOpen}>{data.name}</Typography>
      </TableCell>
      <TableCell align="right">
        <Deletework data={data} />
      </TableCell>
    </TableRow>
  );
};
