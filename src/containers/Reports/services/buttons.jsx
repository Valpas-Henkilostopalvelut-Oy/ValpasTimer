import React from "react";
import { Button } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";

const handleWeekReport = (data) => {
  let arr = data.arr;

  arr.forEach((element) => {
    let arr = element.arr;
    arr.forEach(async (item) => {
      let isSent = item.isSent;
      let isConfirmed = item.isConfirmed;

      if (isSent && !isConfirmed) {
        await DataStore.save(
          TimeEntry.copyOf(item, (updated) => {
            updated.isConfirmed = true;
          })
        );
      }
    });
  });
};

const isConfirmed = (data) => {
  let arr = data.arr;
  let isConfirmed = false;

  arr.forEach((element) => {
    let arr = element.arr;
    arr.forEach((item) => {
      if (item.isConfirmed) {
        isConfirmed = true;
      }
    });
  });

  return isConfirmed;
};

export const WeekReport = ({
  data,
  lang = {
    weekreport: "Confirm last week",
  },
  isEmpty = true,
}) => {
  return (
    !isConfirmed(data) && (
      <Button variant="contained" color="primary" onClick={() => handleWeekReport(data)} disabled={!isEmpty}>
        {lang.weekreport}
      </Button>
    )
  );
};

WeekReport.propTypes = {
  data: PropTypes.object,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
};
