import { Toolbar, Typography, Modal, Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry, AllWorkSpaces } from "../../../models";
const unConfirmSelected = async ({ id }) => {
  //unconfirm selected
  try {
    const timeToUnConfirm = await DataStore.query(TimeEntry, id);

    if (timeToUnConfirm.isConfirmed) {
      await DataStore.save(
        TimeEntry.copyOf(timeToUnConfirm, (updated) => {
          updated.isConfirmed = false;
        })
      );
    }
  } catch (error) {
    console.warn(error);
  }
};

const confirmSelected = async ({ id }) => {
  try {
    const timeToConfirm = await DataStore.query(TimeEntry, id);

    if (!timeToConfirm.isConfirmed) {
      await DataStore.save(
        TimeEntry.copyOf(timeToConfirm, (update) => {
          update.isConfirmed = true;
          update.isLocked = true;
        })
      );
    }
  } catch (error) {
    console.warn(error);
  }
};

//Delete selected
const deleteSelected = async ({ id }) => {
  try {
    const original = await DataStore.query(TimeEntry, id);
    DataStore.delete(original);
  } catch (error) {
    console.warn(error);
  }
};

export const Unconfirm = ({ isAdmin, timeId, reload }) => {
  return (
    <Button
      onClick={async () => {
        await unConfirmSelected({ id: timeId });
        reload();
      }}
    >
      Unconfirm
    </Button>
  );
};

export const Confirm = ({ isAdmin, isClient, timeId, reload }) => {
  const [open, setOpen] = useState(false);

  //confirm button

  return (
    <Fragment>
      <Button onClick={() => setOpen(!open)}>Confirm</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="modal-title">
            Send to Confirm
          </Typography>
          <Typography variant="subtitle1" id="modal-description">
            Are you sure you want to send to confirm?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              onClick={async () => {
                await confirmSelected({ id: timeId });
                reload();
                setOpen(false);
              }}
            >
              Send
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};

export const Delete = ({ isAdmin, timeId, reload }) => {
  return (
    <Button
      onClick={async () => {
        await deleteSelected({ id: timeId });
        reload();
      }}
    >
      Delete
    </Button>
  );
};

export const Header = ({ selectedOption, setSelectedOption, isAdmin, isClient }) => {
  const [works, setWorks] = useState(null);

  useEffect(() => {
    const loadAdminWorks = async () => {
      const work = await DataStore.query(AllWorkSpaces);
      if (work.length !== 0) {
        setWorks(work);
        setSelectedOption(work[0].id);
      }
    };

    const loadClientWorks = async () => {
      const work = await DataStore.query(AllWorkSpaces);
      const user = await Auth.currentAuthenticatedUser();
      const w = work.filter((w) => w.clientId.includes(user.username));
      setWorks(w);
      setSelectedOption(w[0].id);
    };

    let isActive = false;

    if (!isActive) {
      if (isAdmin) {
        loadAdminWorks();
      } else {
        loadClientWorks();
      }
    }

    return () => (isActive = true);
  }, [isAdmin]);

  return (
    <Toolbar
      sx={{
        pt: { sm: 2, md: 3 },
        pb: { sm: 2, md: 3 },
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <FormControl fullWidth sx={{ maxWidth: 180 }}>
        <InputLabel id="work-select-label">Work</InputLabel>
        <Select
          labelId="work-select-label"
          id="work-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {works !== null &&
            works.map((work) => (
              <MenuItem key={work.id} value={work.id}>
                {work.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Toolbar>
  );
};
