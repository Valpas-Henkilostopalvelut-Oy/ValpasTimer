import React from "react";
import {
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
import { TimeEntry } from "../../../models";

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

const Confirmdialog = ({ date, open = false, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Confirm all entries</DialogTitle>
      <DialogContent>Are you sure you want to confirm all entries?</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>No</Button>
        <Button
          onClick={() => {
            confirmAll(date);
            setOpen(false);
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmreportSM = ({ date, isEmpty = true }) => {
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
              Confirm
            </Button>
            <Confirmdialog date={date} open={open} setOpen={setOpen} />
          </>
        ) : (
          <Button variant="contained" color="error" onClick={() => unconfirmAll(date)} disabled={!isEmpty}>
            Unconfirm
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export const ConfirmreportMD = ({ date, isEmpty = true }) => {
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
            Confirm
          </Button>
          <Confirmdialog date={date} open={open} setOpen={setOpen} />
        </>
      ) : (
        <Button variant="contained" color="error" onClick={() => unconfirmAll(date)} disabled={!isEmpty}>
          Unconfirm
        </Button>
      )}
    </TableCell>
  );
};
