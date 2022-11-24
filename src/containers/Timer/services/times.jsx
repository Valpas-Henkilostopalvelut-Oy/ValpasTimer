import React from "react";
import { Typography, Menu, MenuItem, IconButton, Box } from "@mui/material";
import { TextToTime } from "../../../services/time.jsx";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const STime = ({ date }) => {
  let sTime = new Date(date.arr[date.arr.length - 1].timeInterval.start);
  return (
    <Typography variant="p">
      {sTime.getHours()}:{sTime.getMinutes()}
    </Typography>
  );
};

export const ETime = ({ date }) => {
  let eTime = new Date(date.arr[0].timeInterval.end);
  return (
    <Typography variant="p">
      {eTime.getHours()}:{eTime.getMinutes()}
    </Typography>
  );
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
  return <TextToTime date={date.timeInterval.start} onChange={(t) => updateSTime(date, t)} disabled={date.isSent} />;
};

const updateETime = async (data, time) => {
  let eTime = new Date(data.timeInterval.end).setHours(time.h, time.min, 0, 0);
  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.end = new Date(eTime).toISOString();
    })
  ).catch((e) => console.warn(e));
};

export const EditETime = ({ date }) => {
  return <TextToTime date={date.timeInterval.end} onChange={(t) => updateETime(date, t)} disabled={date.isSent} />;
};

const deleteTime = async (data, close) => {
  await DataStore.delete(data)
    .then(() => close())
    .catch((e) => console.warn(e));
};

const dublicateTime = async (data) => {
  let newTimeData = {
    timeInterval: {
      start: data.timeInterval.start,
      end: data.timeInterval.end,
    },
    description: data.description,
    workplaceId: data.workspaceId,
    userId: data.userId,
  };

  await DataStore.save(
    new TimeEntry({
      description: newTimeData.description,
      userId: newTimeData.userId,
      workspaceId: newTimeData.workplaceId,
      timeInterval: {
        start: data.timeInterval.start,
        end: data.timeInterval.end,
        duration: "",
      },
      isActive: false,
      isLocked: false,
      isSent: false,
      isConfirmed: false,
      billable: false,
      breaks: [],
    })
  )
    .then((l) => {
      //close();
      console.log(l);
    })
    .catch((e) => console.warn(e));
};

const cancelsend = async (data, close) => {
  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.isSent = false;
    })
  )
    .then(() => close())
    .catch((e) => console.warn(e));
};

const send = async (data, close) => {
  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.isSent = true;
    })
  )
    .then(() => close())
    .catch((e) => console.warn(e));
};

export const MoreButton = ({
  isEmpty = false,
  date,
  lang = {
    buttons: {
      delete: "Delete",
      dublicate: "Dublicate",
      send: "Send",
      cancelsend: "Cancel send",
    },
  },
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const isSent = !date.isSent;
  const isConfirmed = !date.isConfirmed;

  return (
    <>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true">
        <MoreVertIcon onClick={handleClick} />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem onClick={() => dublicateTime(date)} disabled={!isEmpty}>
          <Typography variant="p">{lang.buttons.dublicate}</Typography>
        </MenuItem>
        {isSent ? (
          <Box>
            <MenuItem onClick={() => send(date, handleClose())} disabled={!isEmpty}>
              <Typography variant="p">{lang.buttons.send}</Typography>
            </MenuItem>
            <MenuItem onClick={() => deleteTime(date, handleClose())} disabled={!isEmpty}>
              <Typography variant="p">{lang.buttons.delete}</Typography>
            </MenuItem>
          </Box>
        ) : (
          isConfirmed && (
            <MenuItem onClick={() => cancelsend(date, handleClose())} disabled={!isEmpty}>
              <Typography variant="p">{lang.buttons.cancelsend}</Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
};
