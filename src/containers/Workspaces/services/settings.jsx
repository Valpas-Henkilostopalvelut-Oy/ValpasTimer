import React, { useEffect, useState, Fragment } from "react";
import { DataStore, Hub } from "aws-amplify";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  TableCell,
  DialogContent,
  TableRow,
  Paper,
  Button,
  Box,
  Collapse,
  TextField,
  useTheme,
  Grid,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";

export const Settings = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="contained">
        Settings
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <DialogTitle id="dialog-title">Settings for {data.name}</DialogTitle>
        <DialogContent>Comming soon</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
