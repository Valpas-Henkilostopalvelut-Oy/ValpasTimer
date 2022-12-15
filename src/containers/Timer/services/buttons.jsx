import React, { useState } from "react";
import {
  IconButton,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const deleteAll = async (date) => {
  let arr = date.arr;
  for (let i = 0; i < arr.length; i++) {
    let isSent = arr[i].isSent;
    if (!isSent) {
      await DataStore.delete(arr[i]).catch((e) => console.warn(e));
    }
  }
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
    <Box>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
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
    </Box>
  );
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
      <IconButton onClick={() => setOpen(true)} disabled={!isEmpty}>
        <DeleteIcon />
      </IconButton>
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

const weekreport = async (date, selected) => {
  let arr = date.arr;

  arr.forEach((element) => {
    let arr = element.arr;
    arr = arr.find((element) => element.workId === selected);

    arr.arr.forEach(async (element) => {
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
  selected,
}) => {
  let isSent = () => {
    let arr = date.arr;
    let isSent = true;
    arr.forEach((element) => {
      let arr = element.arr;
      arr.forEach((element) => {
        let arr = element.arr;
        arr.forEach((element) => {
          if (!element.isSent) {
            isSent = false;
          }
        });
      });
    });
    return isSent;
  };

  return (
    !isSent() && (
      <Button
        variant="text"
        color="primary"
        onClick={() => weekreport(date, selected)}
        disabled={!isEmpty || selected === ""}
      >
        {lang.buttons.reportweek}
      </Button>
    )
  );
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
      },
      isActive: false,
      isLocked: false,
      isSent: false,
      isConfirmed: false,
      billable: false,
      breaks: [],
    })
  ).catch((e) => console.warn(e));
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

MoreButton.propTypes = {
  data: PropTypes.object,
  lang: PropTypes.object,
  close: PropTypes.func,
};

DeleteAll.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
};

ReportAll.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
};

Reportallweek.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
  isEmpty: PropTypes.bool,
  selected: PropTypes.string,
};
