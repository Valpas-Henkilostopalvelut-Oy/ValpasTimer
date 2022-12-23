import React, { useState } from "react";
import {
  TextField,
  Typography,
  useTheme,
  TableRow,
  TableCell,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";
import DescriptionIcon from "@mui/icons-material/Description";

const updateDescription = async (date, newDescription) => {
  await DataStore.save(
    TimeEntry.copyOf(date, (updated) => {
      updated.description = newDescription;
    })
  ).catch((e) => console.warn(e));
};

const EditDescription = ({
  date,
  lang = {
    none_description: "No description",
    add_description: "Add description",
  },
}) => {
  const [desc, setDesc] = useState(date.description);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSent = date.isSent;

  return (
    <Box
      sx={{
        cursor: !isSent && "pointer",
        maxWidth: "280px",
      }}
    >
      <Typography variant="p" onClick={() => setOpen(true && !isSent)}>
        {desc !== "" ? desc : <DescriptionIcon />}
      </Typography>
      <Dialog open={open && !isSent} onClose={() => setOpen(false)} maxWidth={"xs"} fullWidth={true}>
        <DialogTitle>{lang.add_description}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            variant="standard"
            fullWidth
            multiline
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={lang.add_description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateDescription(date, desc);
              setOpen(false);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export const EditDescriptionSM = ({ date, lang }) => {
  const theme = useTheme();

  return (
    <TableRow
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <TableCell colSpan={4}>
        <EditDescription date={date} lang={lang} />
      </TableCell>
    </TableRow>
  );
};

export const EditDescriptionMD = ({ date, lang }) => {
  const theme = useTheme();

  return (
    <TableCell
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      <EditDescription date={date} lang={lang} />
    </TableCell>
  );
};

EditDescription.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
};

EditDescriptionSM.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
};

EditDescriptionMD.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
};
