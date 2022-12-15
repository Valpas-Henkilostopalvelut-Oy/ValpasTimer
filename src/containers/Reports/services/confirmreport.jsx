import React from "react";
import { Button, TableRow, TableCell, useTheme, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";

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
        {!isConfirmed ? (
          <>
            <Button variant="contained" color="success" onClick={() => setOpen(!open)} disabled={!isEmpty}>
              {lang.confirm}
            </Button>
            <Confirmdialog date={date} open={open} setOpen={setOpen} lang={lang} />
          </>
        ) : (
          <Button variant="contained" color="error" onClick={() => unconfirmAll(date)} disabled={!isEmpty}>
            {lang.unconfirm}
          </Button>
        )}
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
  },
}) => {
  const theme = useTheme();
  let isConfirmed = date.arr.filter((e) => e.isConfirmed).length === date.arr.length;
  const [open, setOpen] = React.useState(false);

  return (
    <TableCell
      align="center"
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      {!isConfirmed ? (
        <>
          <Button variant="contained" color="success" onClick={() => setOpen(!open)} disabled={!isEmpty}>
            {lang.confirm}
          </Button>
          <Confirmdialog date={date} open={open} setOpen={setOpen} lang={lang} />
        </>
      ) : (
        <Button variant="contained" color="error" onClick={() => unconfirmAll(date)} disabled={!isEmpty}>
          {lang.unconfirm}
        </Button>
      )}
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
