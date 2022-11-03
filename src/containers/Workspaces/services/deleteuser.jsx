import React, { useEffect, useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../../models";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  Box,
  Collapse,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const Deleteuser = ({ user, data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
        <DialogTitle id="dialog-title">Confirm to delete this user?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {user.name} from {data.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() =>
              deleteuser({
                user: user,
                data: data,
                handleClose,
              })
            }
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const deleteuser = async ({ user, data, handleClose }) => {
  await DataStore.save(
    AllWorkSpaces.copyOf(data, (updated) => {
      updated.workers = updated.workers.filter((worker) => worker !== user.id);
    })
  )
    .then(() => {
      handleClose();
    })
    .catch((err) => {
      console.warn(err);
    });
};
