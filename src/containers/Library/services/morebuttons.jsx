import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PropTypes } from "prop-types";
import { TimeEntry } from "../../../models";
import { DataStore } from "aws-amplify";

const onPaidWeek = (arr) => {
  arr.forEach((element) => {
    element.arr.forEach(async (item) => {
      item = item.timeshift;
      await DataStore.save(
        TimeEntry.copyOf(item, (updated) => {
          updated.isLocked = true;
        })
      )
        .catch((err) => console.log(err))
        .then((res) => console.log(res));
    });
  });
};

const onDeleteWeek = (arr) => {
  arr.forEach((element) => {
    element.arr.forEach(async (item) => {
      item = item.timeshift;
      await DataStore.delete(item)
        .catch((err) => console.log(err))
        .then((res) => console.log(res));
    });
  });
};

const onPaidDay = (arr) => {
  arr.forEach(async (item) => {
    item = item.timeshift;
    await DataStore.save(
      TimeEntry.copyOf(item, (updated) => {
        updated.isLocked = true;
      })
    )
      .catch((err) => console.log(err))
      .then((res) => console.log(res));
  });
};

const onDeleteDay = (arr) => {
  arr.forEach(async (item) => {
    item = item.timeshift;
    await DataStore.delete(item)
      .catch((err) => console.log(err))
      .then((res) => console.log(res));
  });
};

const onPaid = async (item) => {
  item = item.timeshift;
  await DataStore.save(
    TimeEntry.copyOf(item, (updated) => {
      updated.isLocked = true;
    })
  )
    .catch((err) => console.log(err))
    .then((res) => console.log(res));
};

export const Moremenuweek = ({ date }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handlePaid = () => {
    onPaidWeek(date);
    handleClose();
  };
  const handleDelete = () => {
    onDeleteWeek(date);
    handleClose();
  };

  return (
    <Box>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handlePaid}>Maksaa</MenuItem>
        <MenuItem onClick={handleDelete}>Poista</MenuItem>
      </Menu>
    </Box>
  );
};

export const Moremenuday = ({ date }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handlePaid = () => {
    onPaidDay(date);
    handleClose();
  };
  const handleDelete = () => {
    onDeleteDay(date);
    handleClose();
  };

  return (
    <Box>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handlePaid}>Maksaa</MenuItem>
        <MenuItem onClick={handleDelete}>Poista</MenuItem>
      </Menu>
    </Box>
  );
};

export const Moremenutimeshift = ({ date }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handlePaid = () => {
    onPaid(date);
    handleClose();
  };

  return (
    <Box>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handlePaid}>Maksaa</MenuItem>
      </Menu>
    </Box>
  );
};
