import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaidIcon from "@mui/icons-material/Paid";
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
          updated.paidAt = new Date().toISOString();
        })
      )
        .catch((err) => console.log(err))
        .then((res) => console.warn(res));
    });
  });
};

const onPaidDay = (arr) => {
  arr.forEach(async (item) => {
    item = item.timeshift;
    await DataStore.save(
      TimeEntry.copyOf(item, (updated) => {
        updated.isLocked = true;
        updated.paidAt = new Date().toISOString();
      })
    )
      .catch((err) => console.log(err))
      .then((res) => console.warn(res));
  });
};

const onPaid = async (item) => {
  item = item.timeshift;
  await DataStore.save(
    TimeEntry.copyOf(item, (updated) => {
      updated.isLocked = true;
      updated.paidAt = new Date().toISOString();
    })
  )
    .catch((err) => console.log(err))
    .then((res) => console.warn(res));
};

const onDeleteDay = (arr) => {
  arr.forEach(async (item) => {
    item = item.timeshift;
    await DataStore.delete(item)
      .catch((err) => console.log(err))
      .then((res) => console.warn(res));
  });
};

const onCancelWeek = (arr) => {
  arr.forEach((element) => {
    element.arr.forEach(async (item) => {
      item = item.timeshift;
      await DataStore.save(
        TimeEntry.copyOf(item, (updated) => {
          updated.isLocked = false;
          updated.paidAt = null;
        })
      )
        .catch((err) => console.log(err))
        .then((res) => console.warn(res));
    });
  });
};

const onCancelDay = (arr) => {
  arr.forEach(async (item) => {
    item = item.timeshift;
    await DataStore.save(
      TimeEntry.copyOf(item, (updated) => {
        updated.isLocked = false;
        updated.paidAt = null;
      })
    )
      .catch((err) => console.log(err))
      .then((res) => console.warn(res));
  });
};

const onCancel = async (item) => {
  item = item.timeshift;
  await DataStore.save(
    TimeEntry.copyOf(item, (updated) => {
      updated.isLocked = false;
      updated.paidAt = null;
    })
  )
    .catch((err) => console.log(err))
    .then((res) => console.warn(res));
};

export const Payweek = ({ date, paid, worker = "", workname }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePaid = () => {
    onPaidWeek(date.arr);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Merkitse maksetuksi" hidden={paid}>
        <IconButton onClick={handleClick} size="small">
          <PaidIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ p: "26px 28px" }}>Merkitse maksetuksi</DialogTitle>
        <DialogContent sx={{ p: "26px 28px" }}>
          <Box sx={{ width: "280px" }}>
            <Typography variant="body2" gutterBottom>
              {worker} <br />
              Viikko {date.week} <br /> Asiakas: {workname}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start", p: "0px 28px 26px 28px" }}>
          <Button onClick={handleClose} variant="outlined">
            Peruuta
          </Button>
          <Button onClick={handlePaid} autoFocus variant="outlined">
            Vahvista
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
          <MenuItem onClick={handlePaid}>Merkitse maksetuksi</MenuItem>
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
          <MenuItem onClick={handlePaid}>Merkitse maksetuksi</MenuItem>
        ) : (
          <MenuItem onClick={handleCancel}>Maksamaton</MenuItem>
        )}
        <MenuItem onClick={handleDelete}>Poista</MenuItem>
      </Menu>
    </Box>
  );
};
