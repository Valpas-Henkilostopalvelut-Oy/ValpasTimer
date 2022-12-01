/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry, Break } from "../../../../models";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useTheme,
  TextField,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const Breaks = ({ data = null, lang, isEmpty = false }) => {
  const [open, setOpen] = useState(false);
  var isSent = false;
  if (data) isSent = data.isSent;

  return (
    <Box>
      <Button variant="text" color="primary" onClick={() => setOpen(true)} disabled={!isEmpty || !data}>
        Add Break
      </Button>

      <Dialog open={open && !isSent} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>
          <Typography variant="h6">Add Break</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Add a break to your time entry
            </Typography>
            <BreakPopover data={data} isEmpty={isEmpty} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const addBreak = async (data, value) => {
  console.log(data);
  const val = {
    15: Break.MIN15,
    30: Break.MIN30,
    45: Break.MIN45,
    60: Break.H1,
  };

  await DataStore.query(TimeEntry, data.id)
    .then((entry) => {
      DataStore.save(
        TimeEntry.copyOf(entry, (updated) => {
          updated.breaks = [
            ...entry.breaks,
            {
              start: new Date().toISOString(),
              duration: val[value],
            },
          ];
        })
      );
    })
    .catch((e) => console.warn(e));
};

const BreakPopover = ({ data, isEmpty = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>

      <Menu
        id={id}
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
        <MenuItem onClick={() => addBreak(data, 15)}>
          <Typography>15 minutes</Typography>
        </MenuItem>
        <MenuItem onClick={() => addBreak(data, 30)}>
          <Typography>30 minutes</Typography>
        </MenuItem>
        <MenuItem onClick={() => addBreak(data, 45)}>
          <Typography>45 minutes</Typography>
        </MenuItem>
        <MenuItem onClick={() => addBreak(data, 60)}>
          <Typography>1 hour</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
