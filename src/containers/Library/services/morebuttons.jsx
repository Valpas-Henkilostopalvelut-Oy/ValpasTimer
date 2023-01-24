import React, { useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  ListItemText,
  Checkbox,
  ListSubheader,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Daterangestart, Daterangeend } from "./times";
import { PropTypes } from "prop-types";

export const Filter = ({
  filter = {
    paid: false,
    all: true,
    start: new Date(),
    end: new Date(),
  },
  setFilter,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <Button
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        fullWidth
      >
        Filter
      </Button>
      <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => setFilter({ ...filter, paid: !filter.paid })}>
          <Checkbox checked={filter.paid} onChange={() => setFilter({ ...filter, paid: !filter.paid })} />
          <ListItemText primary="Maksu odottaa" />
        </MenuItem>
        <MenuItem onClick={() => setFilter({ ...filter, all: !filter.all })}>
          <Checkbox checked={filter.all} onChange={() => setFilter({ ...filter, all: !filter.all })} />
          <ListItemText primary="Kaikki" />
        </MenuItem>
        <ListSubheader>Valitse aikaväli</ListSubheader>
        <MenuItem>
          <Daterangestart filter={filter} setFilter={setFilter} />
        </MenuItem>
        <MenuItem>
          <Daterangeend filter={filter} setFilter={setFilter} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export const Moremenuweek = ({ date }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
        <MenuItem onClick={handleClose}>Maksaa</MenuItem>
        <MenuItem onClick={handleClose}>Poista</MenuItem>
      </Menu>
    </Box>
  );
};

export const Moremenuday = ({ date }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
        <MenuItem onClick={handleClose}>Maksaa</MenuItem>
        <MenuItem onClick={handleClose}>Poista</MenuItem>
      </Menu>
    </Box>
  );
};

export const Moremenutimeshift = ({ date }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
        <MenuItem onClick={handleClose}>Poista</MenuItem>
      </Menu>
    </Box>
  );
};

Filter.propTypes = {
  filter: PropTypes.object,
  setFilter: PropTypes.func,
};

Moremenuweek.propTypes = {
  date: PropTypes.object,
};
