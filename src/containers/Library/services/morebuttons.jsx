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

const onCancelWeek = (arr) => {
  arr.forEach((element) => {
    element.arr.forEach(async (item) => {
      item = item.timeshift;
      await DataStore.save(
        TimeEntry.copyOf(item, (updated) => {
          updated.isLocked = false;
        })
      )
        .catch((err) => console.log(err))
        .then((res) => console.log(res));
    });
  });
};

const onCancelDay = (arr) => {
  arr.forEach(async (item) => {
    item = item.timeshift;
    await DataStore.save(
      TimeEntry.copyOf(item, (updated) => {
        updated.isLocked = false;
      })
    )
      .catch((err) => console.log(err))
      .then((res) => console.log(res));
  });
};

const onCancel = async (item) => {
  item = item.timeshift;
  await DataStore.save(
    TimeEntry.copyOf(item, (updated) => {
      updated.isLocked = false;
    })
  )
    .catch((err) => console.log(err))
    .then((res) => console.log(res));
};

export const Moremenuweek = ({ date, paid }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handlePaid = () => {
    onPaidWeek(date);
    handleClose();
  };

  const handleCancel = () => {
    onCancelWeek(date);
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
        {!paid ? (
          <MenuItem onClick={handlePaid}>Maksaa</MenuItem>
        ) : (
          <MenuItem onClick={handleCancel}>Maksamaton</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export const Moremenuday = ({ date, paid }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handlePaid = () => {
    onPaidDay(date);
    handleClose();
  };

  const handleCancel = () => {
    onCancelDay(date);
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
        {!paid ? (
          <MenuItem onClick={handlePaid}>Maksaa</MenuItem>
        ) : (
          <MenuItem onClick={handleCancel}>Maksamaton</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export const Moremenutimeshift = ({ date, paid }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handlePaid = () => {
    onPaid(date);
    handleClose();
  };

  const handleDelete = () => {
    onDeleteDay(date);
    handleClose();
  };

  const handleCancel = () => {
    onCancel(date);
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
        {!paid ? (
          <MenuItem onClick={handlePaid}>Maksaa</MenuItem>
        ) : (
          <MenuItem onClick={handleCancel}>Maksamaton</MenuItem>
        )}
        <MenuItem onClick={handleDelete}>Poista</MenuItem>
      </Menu>
    </Box>
  );
};
