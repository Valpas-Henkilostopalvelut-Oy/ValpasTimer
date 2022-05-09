import React, { useState, Fragment, useEffect } from "react";
import { Typography, Modal, Box, Button, Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry, AllWorkSpaces, UserCredentials } from "../../../models";

export function SendForm(props) {
  const { reload, id, isSent, isConfirmed } = props;
  const [open, setOpen] = useState(false);

  const sendItem = async () => {
    try {
      const timeToSend = await DataStore.query(TimeEntry, id);
      if (!isSent && !isConfirmed) {
        await DataStore.save(
          TimeEntry.copyOf(timeToSend, (updated) => {
            updated.isSent = true;
          })
        );
        reload();
      } else {
        console.log("already sent");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    !isSent && (
      <Fragment>
        <Button onClick={() => setOpen(!open)}>Send</Button>

        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
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
                  await sendItem();
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
    )
  );
}

export function DeleteForm(props) {
  const { reload, id, isSent, isConfirmed } = props;
  const [open, setOpen] = useState(false);
  const deleteItem = async () => {
    try {
      if (!isSent && !isConfirmed) {
        const timeToDelete = await DataStore.query(TimeEntry, id);
        await DataStore.delete(timeToDelete);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    !isSent && (
      <Fragment>
        <Button color="secondary" onClick={() => setOpen(!open)}>
          Delete
        </Button>

        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
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
              Delete
            </Typography>
            <Typography variant="subtitle1" id="modal-description">
              Are you sure you want to delete?
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
                  await deleteItem();
                  reload();
                  setOpen(false);
                }}
              >
                Delete
              </Button>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </Fragment>
    )
  );
}

export function WorkOfTime({ timeId, id, reload, isSent, isConfirmed }) {
  const [work, setWork] = useState(null);
  const [works, setWorks] = useState(null);

  useEffect(() => {
    let isActive = true;

    const getWorkIncldue = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const creditails = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);
        const w = await DataStore.query(AllWorkSpaces);
        if (w.length > 0) setWorks(w);

        let q = [];

        if (creditails.length !== 0) {
          for (let i = 0; i < creditails.memberships.length; i++) {
            const workspaceList = await DataStore.query(AllWorkSpaces, creditails.memberships[i].targetId);
            q.push({
              value: workspaceList.id,
              label: workspaceList.name,
            });
          }
          setWork(q);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    isActive && getWorkIncldue();

    return () => {
      isActive = false;
    };
  }, []);

  const changeWork = async (event) => {
    try {
      const timeToChange = await DataStore.query(TimeEntry, timeId);
      await DataStore.save(
        TimeEntry.copyOf(timeToChange, (updated) => {
          updated.workspaceId = event.target.value;
        })
      );
      reload();
    } catch (error) {
      console.warn(error);
    }
  };

  return !isSent && work !== null ? (
    <FormControl variant="standard" fullWidth sx={{ maxWidth: 100, pb: 2 }}>
      <InputLabel id="work-of-time">Work of Time</InputLabel>
      <Select labelId="work-of-time" id="work-of-time" value={id} onChange={changeWork}>
        {work.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    work !== null && <Typography variant="p">{works.find((i) => i.id === id).name}</Typography>
  );
}
