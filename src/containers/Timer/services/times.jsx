import React, { useState } from "react";
import { TextToTime } from "../../../services/time.jsx";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";
import { SnackSuccess } from "../../../components/Alert/index.jsx";

export const Time = ({ time }) => {
  let t = new Date(time);
  let hours = String(t.getHours()).padStart(2, "0");
  let minutes = String(t.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const updateSTime = async (data, time) => {
  let sTime = new Date(data.timeInterval.start).setHours(time.h, time.min, 0, 0);

  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.start = new Date(sTime).toISOString();
    })
  ).catch((e) => console.warn(e));
};

export const EditSTime = ({ date }) => {
  return (
    <TextToTime date={new Date(date.timeInterval.start)} onChange={(t) => updateSTime(date, t)} isSent={date.isSent} />
  );
};

const updateETime = async (data, time, setSnack) => {
  let eTime = new Date(data.timeInterval.end).setHours(time.h, time.min, 0, 0);
  return await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.end = new Date(eTime).toISOString();
    })
  ).catch((e) => console.warn(e));
};

export const EditETime = ({ date }) => {
  const [snack, setSnack] = useState(false);
  return (
    <>
      <TextToTime
        date={new Date(date.timeInterval.end)}
        onChange={async (t) =>
          await updateETime(date, t, setSnack).then((e) => {
            console.log(e);
            setSnack(true);
          })
        }
        isSent={date.isSent}
      />
      <SnackSuccess message="Time updated" open={snack} setOpen={setSnack} />
    </>
  );
};

Time.propTypes = {
  time: PropTypes.string,
};

EditSTime.propTypes = {
  date: PropTypes.object,
};

EditETime.propTypes = {
  date: PropTypes.object,
};
