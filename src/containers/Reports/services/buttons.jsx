import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { weekstatus, daystatus, timeshiftstatus } from "./status.jsx";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { confirmweek, confirmday, confirmtimeshift, unconfirmday, unconfirmtimeshift } from "./functions";

export const Weekconfirm = (props) => {
  const { week, isEmpty } = props;
  const status = weekstatus(week);
  const handleWeekconfirm = () => confirmweek(week);

  return (
    <Tooltip title="Vahvihstaa viikko" hidden={status.isConfirmed}>
      <IconButton onClick={handleWeekconfirm} disabled={!isEmpty}>
        <ThumbUpAltIcon />
      </IconButton>
    </Tooltip>
  );
};

export const Daymorebutton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { day, isEmpty } = props;
  const status = daystatus(day);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleConfirm = () => {
    handleClose();
    confirmday(day);
  };
  const handleUnconfirm = () => {
    handleClose();
    unconfirmday(day);
  };

  return (
    <>
      <Tooltip title="Päivän toiminnot">
        <IconButton onClick={handleClick} id="day-more-button">
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="day-more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "day-more-button" }}
      >
        <MenuItem onClick={handleConfirm} disabled={status.isConfirmed || !isEmpty}>
          Vahvista päivä
        </MenuItem>
        <MenuItem onClick={handleUnconfirm} disabled={!status.isConfirmed || !isEmpty}>
          Peruuta päivän vahvistus
        </MenuItem>
      </Menu>
    </>
  );
};

export const Timeshiftmorebutton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { timeshift, isEmpty } = props;
  const status = timeshiftstatus(timeshift);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleConfirm = () => {
    handleClose();
    confirmtimeshift(timeshift);
  };
  const handleUnconfirm = () => {
    handleClose();
    unconfirmtimeshift(timeshift);
  };

  return (
    <>
      <Tooltip title="Vaihtovuoron toiminnot">
        <IconButton onClick={handleClick} id="timeshift-more-button">
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="timeshift-more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "timeshift-more-button" }}
      >
        <MenuItem onClick={handleConfirm} disabled={status.isConfirmed || !isEmpty}>
          Vahvista vaihtovuoro
        </MenuItem>
        <MenuItem onClick={handleUnconfirm} disabled={!status.isConfirmed || !isEmpty}>
          Peruuta vaihtovuoron vahvistus
        </MenuItem>
      </Menu>
    </>
  );
};
