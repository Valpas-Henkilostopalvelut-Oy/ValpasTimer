import React, { useState } from "react";
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";

const deleteAll = async (date) => {
  let arr = date.arr;
  for (let i = 0; i < arr.length; i++) {
    let isSent = arr[i].isSent;
    if (!isSent) {
      await DataStore.delete(arr[i]).catch((e) => console.warn(e));
    }
  }
};

export const DeleteAll = ({
  date,
  lang = {
    title: {
      deleteTitle: "Are you sure you want to delete this entry?",
      deleteAlert: "This entry will be deleted permanently",
    },
    buttons: { delete: "Delete", cancel: "Cancel" },
  },
  isEmpty = false,
}) => {
  const [open, setOpen] = useState(false);
  var isSent = date.isSent;
  return (
    <Box>
      <Button variant="text" color="error" onClick={() => setOpen(true)} disabled={!isEmpty}>
        {lang.buttons.delete}
      </Button>
      <Dialog open={open && !isSent} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Typography variant="h6">{lang.title.deleteTitle}</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            {lang.title.deleteAlert}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{lang.buttons.cancel}</Button>
          <Button
            onClick={() => {
              deleteAll(date);
              setOpen(false);
            }}
            color="error"
          >
            {lang.buttons.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const reportAll = async (date) => {
  let arr = date.arr;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isSent) {
      await DataStore.save(
        TimeEntry.copyOf(arr[i], (update) => {
          update.isSent = true;
        })
      ).catch((e) => console.warn(e));
    }
  }
};

export const ReportAll = ({
  date,
  lang = {
    buttons: { report: "Report" },
  },
}) => {
  return (
    <Button variant="text" color="primary" onClick={() => reportAll(date)}>
      {lang.buttons.report}
    </Button>
  );
};

const weekreport = async (date) => {
  let arr = date.arr;
  arr.forEach((element) => {
    let arr = element.arr;
    arr.forEach(async (element) => {
      if (!element.isSent) {
        await DataStore.save(
          TimeEntry.copyOf(element, (update) => {
            update.isSent = true;
          })
        ).catch((e) => console.warn(e));
      }
    });
  });
};

export const Reportallweek = ({
  date,
  lang = {
    buttons: { reportweek: "Report all week" },
  },
  isEmpty = false,
}) => {
  let isSent = () => {
    let arr = date.arr;
    let isSent = true;
    arr.forEach((element) => {
      let arr = element.arr;
      arr.forEach((element) => {
        if (!element.isSent) {
          isSent = false;
        }
      });
    });
    return isSent;
  };

  return (
    !isSent() && (
      <Button variant="text" color="primary" onClick={() => weekreport(date)} disabled={!isEmpty}>
        {lang.buttons.reportweek}
      </Button>
    )
  );
};
