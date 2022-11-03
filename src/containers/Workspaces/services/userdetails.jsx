import React, { useEffect, useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  Grid,
  Collapse,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Deleteuser } from "./deleteuser.jsx";

export const Userdetails = ({ user, data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <TableRow>
        <TableCell align="left" onClick={handleOpen}>
          {user.name}
        </TableCell>
        <TableCell align="right">
          <Deleteuser user={user} data={data} />
          <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          backgroundColor: "background.custom",
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="p" gutterBottom component="div">
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="p" gutterBottom component="div">
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
