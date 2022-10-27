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

export const DeleteAll = ({ date }) => {
  return (
    <Button variant="text" color="error" onClick={() => deleteAll(date)}>
      Delete
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

export const ReportAll = ({ date }) => {
  return (
    <Button variant="text" color="primary" onClick={() => reportAll(date)}>
      Report
    </Button>
  );
};
