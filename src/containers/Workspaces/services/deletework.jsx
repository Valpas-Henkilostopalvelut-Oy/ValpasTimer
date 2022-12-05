import React, { useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models";
import { Typography, Button, Box, Collapse } from "@mui/material";
import { PropTypes } from "prop-types";

const deletework = async ({ data }) => {
  await DataStore.delete(AllWorkSpaces, data);
};

export const Deletework = ({
  data,
  handleClose,
  lang = {
    delete: {
      title: "Delete workplace",
      message: "Are you sure you want to delete",
    },
    buttons: {
      delete: "Delete",
      settings: "Settings",
      cancel: "Cancel",
      agree: "Agree",
    },
  },
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography>{lang.delete.title}</Typography>
        <Button color="error" variant="contained" onClick={handleOpen}>
          {lang.buttons.delete}
        </Button>
      </Box>
      <Collapse in={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {lang.delete.message} {data.name}?
          </Typography>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            {lang.buttons.cancel}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleClose();
              deletework({
                data: data,
              });
            }}
          >
            {lang.buttons.agree}
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

Deletework.propTypes = {
  data: PropTypes.object,
  handleClose: PropTypes.func,
  lang: PropTypes.object,
};
