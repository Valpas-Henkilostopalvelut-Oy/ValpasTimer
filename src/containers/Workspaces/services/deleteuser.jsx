import React, { useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models";
import { Dialog, DialogActions, DialogTitle, Button, DialogContent, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Deleteuser = ({
  user,
  data,
  lang = {
    allert_worker: {
      title: "Confirm to delete this worker",
      message: "Are you sure you want to delete",
      message2: "from",
      confirm: "Confirm",
      cancel: "Cancel",
    },
  },
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth={"xs"}
        fullWidth={true}
      >
        <DialogTitle id="dialog-title">{lang.allert_worker.title}</DialogTitle>
        <DialogContent>
          {lang.allert_worker.message} {user.name} {lang.allert_worker.message2} {data.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{lang.allert_worker.cancel}</Button>
          <Button
            onClick={() =>
              deleteuser({
                user: user,
                data: data,
                handleClose,
              })
            }
          >
            {lang.allert_worker.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const deleteuser = async ({ user, data, handleClose }) => {
  await DataStore.save(
    AllWorkSpaces.copyOf(data, (updated) => {
      updated.workers = updated.workers.filter((worker) => worker !== user.id);
    })
  )
    .then(() => {
      handleClose();
    })
    .catch((err) => {
      console.warn(err);
    });
};
