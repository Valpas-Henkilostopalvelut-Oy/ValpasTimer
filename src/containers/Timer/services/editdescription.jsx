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
import { TimeEntry } from "../../../models";

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
        [theme.breakpoints.up("sm")]: {
          maxWidth: "280px",
        },
      }}
    >
      <Typography variant="p" onClick={() => setOpen(true && !isSent)}>
        {desc !== "" ? desc : lang.none_description}
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
        paddingLeft: 1,
        paddingRight: 1,
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      <EditDescription date={date} lang={lang} />
    </TableCell>
  );
};

export const Tabledescription = ({ date, lang = { none_description: "No description" } }) => {
  let arr = date.arr.filter((item) => item.description !== "");
  let description = arr.map((item) => item.description).join(", ");
  return (
    <Box
      sx={{
        maxWidth: "180px",
      }}
    >
      <Typography variant="p">{description !== "" ? description : lang.none_description}</Typography>
    </Box>
  );
};
