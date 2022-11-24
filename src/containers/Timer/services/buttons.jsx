import React from "react";
import { Button } from "@mui/material";
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
    buttons: { delete: "Delete" },
  },
  isEmpty = false,
}) => {
  return (
    <Button variant="text" color="error" onClick={() => deleteAll(date)} disabled={!isEmpty}>
      {lang.buttons.delete}
    </Button>
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
