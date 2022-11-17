import React, { useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  Collapse,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const deletework = async ({ data }) => {
  await DataStore.delete(AllWorkSpaces, data);
};

export const Deletework = ({
  data,
  lang = {
    title: "Delete workspace",
    buttons: {
      delete: "Delete",
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
        }}
      >
        <Typography>{lang.title}</Typography>
        <Button color="error" variant="contained">{lang.buttons.delete}</Button>
      </Box>
    </Box>
  );
};
