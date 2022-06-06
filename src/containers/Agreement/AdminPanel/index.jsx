import React, { Fragment, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Tooltip,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import LoaderButton from "../../../components/LoaderButton";
import { DataStore, Auth } from "aws-amplify";
import { Agreement, Status } from "../../../models";

export const AdminPanel = ({ id, data, reload, onOpen }) => {
  return (
    <Accordion sx={{}}>
      <AccordionSummary>
        <Typography>Admin Panel</Typography>
      </AccordionSummary>
      <AccordionDetails>{onOpen && <RenameAgreement id={id} name={data.title} />}</AccordionDetails>
    </Accordion>
  );
};

const RenameAgreement = ({ name }) => {
  const [oldName, setOldName] = useState(name);
  return (
    <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
      <TextField
        id="agreement"
        name="agreement"
        label="Agreement"
        variant="outlined"
        fullWidth
        margin="normal"
        value={oldName}
        onChange={(n) => setOldName(n.target.value)}
        onBlur={(n) => setOldName(n.target.value)}
      />

      <Button
        sx={{ width: "25%", height: 50, mt: 0.6, mr: 4, ml: 4 }}
        variant="contained"
        onClick={() => console.log(oldName)}
      >
        Save
      </Button>
    </Box>
  );
};

const AddSubtitle = () => {
  return (
    <Tooltip title="Add">
      <IconButton>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};
