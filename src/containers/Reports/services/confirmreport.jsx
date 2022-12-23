import React, { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Button,
  TableRow,
  TableCell,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ClearIcon from "@mui/icons-material/Clear";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const unconfirmAll = async (date) => {
  let arr = date.arr;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].isConfirmed) {
      await DataStore.save(
        TimeEntry.copyOf(arr[i], (update) => {
          update.isConfirmed = false;
        })
      ).catch((e) => console.warn(e));
    }
  }
};

const confirmAll = async (date) => {
  let arr = date.arr;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isConfirmed) {
      await DataStore.save(
        TimeEntry.copyOf(arr[i], (update) => {
          update.isConfirmed = true;
        })
      ).catch((e) => console.warn(e));
    }
  }
};

const MoreButton = ({ date, lang = { more: "More" } }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            unconfirmAll(date);
          }}
        >
          {lang.unconfirm}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            confirmAll(date);
          }}
        >
          {lang.confirm}
        </MenuItem>
      </Menu>
    </Box>
  );
};

const Confirmdialog = ({
  date,
  open = false,
  setOpen,
  lang = {
    alert: {
      title: "Confirm all entries",
      message: "Are you sure you want to confirm all entries?",
      confirm: "Confirm",
      cancel: "Cancel",
    },
  },
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{lang.alert.title}</DialogTitle>
      <DialogContent>{lang.alert.message}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{lang.alert.cancel}</Button>
        <Button
          onClick={() => {
            confirmAll(date);
            setOpen(false);
          }}
        >
          {lang.alert.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmreportSM = ({
  date,
  isEmpty = true,
  lang = {
    confirm: "Confirm",
    unconfirm: "Unconfirm",
    sent: "Sent",
    confirmed: "Confirmed",
  },
}) => {
  const theme = useTheme();
  let isConfirmed = date.arr.filter((e) => e.isConfirmed).length === date.arr.length;
  const [open, setOpen] = React.useState(false);

  return (
    <TableRow
      sx={{
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <TableCell align="center" colSpan={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {lang.sent}: <TaskAltIcon color="success" />
          {lang.confirmed}: {isConfirmed ? <TaskAltIcon color="success" /> : <ClearIcon color="error" />}
          <MoreButton date={date} lang={lang} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export const ConfirmreportMD = ({
  date,
  isEmpty = true,
  lang = {
    confirm: "Confirm",
    unconfirm: "Unconfirm",
    sent: "Sent",
    confirmed: "Confirmed",
  },
}) => {
  const theme = useTheme();
  let isConfirmed = date.arr.filter((e) => e.isConfirmed).length === date.arr.length;
  const [open, setOpen] = React.useState(false);

  return (
    <TableCell
      align="right"
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {lang.sent}: <TaskAltIcon color="success" />
        {lang.confirmed}: {isConfirmed ? <TaskAltIcon color="success" /> : <ClearIcon color="error" />}
        <MoreButton date={date} lang={lang} />
      </Box>
    </TableCell>
  );
};

ConfirmreportSM.propTypes = {
  date: PropTypes.object,
  isEmpty: PropTypes.bool,
  lang: PropTypes.object,
};

ConfirmreportMD.propTypes = {
  date: PropTypes.object,
  isEmpty: PropTypes.bool,
  lang: PropTypes.object,
};

Confirmdialog.propTypes = {
  date: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  lang: PropTypes.object,
};
