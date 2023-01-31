import React, { useState } from "react";
import { Menu, MenuItem, Button, Box } from "@mui/material";

const options = (lang) => {
  return [lang.receipt, lang.travel];
};

export const Moreadd = ({ isEmpty, selectedIndex, setSelectedIndex, lang }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleCancel = () => {
    setSelectedIndex(null);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        color="primary"
        fullWidth
      >
        {lang.add}
      </Button>
      <Menu id="select-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        {options(lang).map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
        <MenuItem onClick={handleCancel}>{lang.cancel}</MenuItem>
      </Menu>
    </Box>
  );
};
