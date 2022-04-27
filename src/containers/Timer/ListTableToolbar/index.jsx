import React, { useState } from "react";
import { IconButton, Toolbar, Tooltip, Typography, Modal, Box, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../models";
import LoaderButton from "../../../components/LoaderButton";

const TableToolBar = (props) => {
  const { numSelected, selected, loadUpdate, clearSelected } = props;
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteSelected = async () => {
    try {
      for (let i = 0; i < selected.length; i++) {
        for (let ii = 0; ii < selected[i].arr.length; ii++) {
          const timeToDelete = await DataStore.query(TimeEntry, selected[i].arr[ii].id);
          await DataStore.delete(timeToDelete);
        }
      }
      loadUpdate();
      clearSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendSelected = async (selected) => {
    try {
      for (let i = 0; i < selected.length; i++) {
        for (let ii = 0; ii < selected[i].arr.length; ii++) {
          const timeToSend = await DataStore.query(TimeEntry, selected[i].arr[ii].id);

          if (!timeToSend.isSent) {
            await DataStore.save(
              TimeEntry.copyOf(timeToSend, (updated) => {
                updated.isSent = true;
              })
            );
            loadUpdate();
            clearSelected([]);
          } else {
            clearSelected([]);
          }
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          Time List
        </Typography>
      )}

      {numSelected > 0 && (
        <>
          <Tooltip title="Upload">
            <IconButton onClick={() => setOpen(true)}>
              <UploadIcon />
            </IconButton>
          </Tooltip>

          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
              clearSelected([]);
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
                  onClick={() => {
                    sendSelected(selected);
                    setOpen(false);
                  }}
                >
                  Send
                </Button>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
              </Box>
            </Box>
          </Modal>

          <Tooltip title="Delete">
            <IconButton onClick={() => setDeleteOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Modal
            open={deleteOpen}
            onClose={() => {
              setDeleteOpen(false);
              clearSelected([]);
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
                  onClick={() => {
                    deleteSelected();
                    setDeleteOpen(false);
                  }}
                >
                  Delete
                </Button>
                <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </Toolbar>
  );
};

export default TableToolBar;
