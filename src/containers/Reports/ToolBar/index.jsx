import { Toolbar, Typography, Tooltip, IconButton, Modal, Box, Button } from "@mui/material";
import React, { Fragment, useState } from "react";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { alpha } from "@mui/material/styles";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DeleteIcon from "@mui/icons-material/Delete";
const unConfirmSelected = async ({ selected }) => {
  //unconfirm selected
  try {
    for (let i = 0; i < selected.length; i++) {
      for (let ii = 0; ii < selected[i].arr.length; ii++) {
        const timeToUnConfirm = await DataStore.query(TimeEntry, selected[i].arr[ii].id);

        if (timeToUnConfirm.isConfirmed) {
          await DataStore.save(
            TimeEntry.copyOf(timeToUnConfirm, (updated) => {
              updated.isConfirmed = false;
            })
          );
        }
      }
    }
  } catch (error) {
    console.warn(error);
  }
};

const confirmSelected = async ({ selected }) => {
  try {
    for (let i = 0; i < selected.length; i++) {
      for (let ii = 0; ii < selected[i].arr.length; ii++) {
        const timeToConfirm = await DataStore.query(TimeEntry, selected[i].arr[ii].id);

        if (!timeToConfirm.isConfirmed) {
          await DataStore.save(
            TimeEntry.copyOf(timeToConfirm, (update) => {
              update.isConfirmed = true;
              update.isLocked = true;
            })
          );
        }
      }
    }
  } catch (error) {
    console.warn(error);
  }
};

//Delete selected
const deleteSelected = async ({ selected }) => {
  try {
    for (let i = 0; i < selected.length; i++) {
      for (let ii = 0; ii < selected[i].arr.length; ii++) {
        const original = await DataStore.query(TimeEntry, selected[i].arr[ii].id);
        DataStore.delete(original);
      }
    }
  } catch (error) {
    console.warn(error);
  }
};

const HeadToolBar = ({ numSelected, selected, setSelected, loadNew, isAdmin }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [unConfirmModalOpen, setUnConfirmModalOpen] = useState(false);

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
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
          Time List
        </Typography>
      )}

      {numSelected > 0 && (
        <Fragment>
          <Tooltip title="Confirm">
            <IconButton
              onClick={() => {
                setConfirmModalOpen(true);
              }}
            >
              <ThumbUpOffAltRoundedIcon />
            </IconButton>
          </Tooltip>
          <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
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
                    await confirmSelected({ selected: selected });
                    await loadNew();
                    setSelected([]);
                  }}
                >
                  Send
                </Button>
                <Button onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
              </Box>
            </Box>
          </Modal>

          {isAdmin && (
            <Fragment>
              <Tooltip title="Unconfirm">
                <IconButton
                  onClick={async () => {
                    setUnConfirmModalOpen(true);
                  }}
                >
                  <DoDisturbIcon />
                </IconButton>
              </Tooltip>
              <Modal open={unConfirmModalOpen} onClose={() => setUnConfirmModalOpen(false)}>
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
                    Unconfirming
                  </Typography>
                  <Typography variant="subtitle1" id="modal-description">
                    Are you sure you want unconfirm?
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
                        await unConfirmSelected({ selected: selected });
                        await loadNew();
                        setSelected([]);
                      }}
                    >
                      Send
                    </Button>
                    <Button onClick={() => setUnConfirmModalOpen(false)}>Cancel</Button>
                  </Box>
                </Box>
              </Modal>

              <Tooltip title="Delete">
                <IconButton
                  onClick={async () => {
                    setDeleteModalOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
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
                    Delete selected
                  </Typography>
                  <Typography variant="subtitle1" id="modal-description">
                    Are you sure you want to delete selected?
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
                        await deleteSelected({ selected: selected });
                        await loadNew();
                        setSelected([]);
                      }}
                    >
                      Send
                    </Button>
                    <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                  </Box>
                </Box>
              </Modal>
            </Fragment>
          )}
        </Fragment>
      )}
    </Toolbar>
  );
};

export default HeadToolBar;
