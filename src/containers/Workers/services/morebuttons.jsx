import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { enableUser, disableUser, deleteUser } from "./functions";

const Morebutton = (props) => {
  const { enabled, user, isEmpty } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const creditailsAttr = user.Attributes.find((item) => item.Name === "custom:UserCreditails");
  const creditailsId = creditailsAttr?.Value;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleEnable = () => enableUser(user.Username, creditailsId).then(handleClose);
  const handleDisable = () => disableUser(user.Username, creditailsId).then(handleClose);
  const handleDelete = () => deleteUser(user.Username, creditailsId).then(handleClose);

  return (
    <>
      <IconButton
        aria-label="more"
        id="more-button"
        aria-controls={open ? "more-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEnable} disabled={enabled || !isEmpty} hidden={enabled}>
          Ota käyttöön
        </MenuItem>
        <MenuItem onClick={handleDisable} disabled={!enabled || !isEmpty} hidden={!enabled}>
          Pois käytöstä
        </MenuItem>
        <MenuItem onClick={handleDelete} disabled={!isEmpty}>
          Poista
        </MenuItem>
      </Menu>
    </>
  );
};

export default Morebutton;
