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
  const [click, setClick] = useState(false);
  const theme = useTheme();

  return date.isSent ? (
    <Typography variant="p">{desc !== "" ? desc : lang.none_description}</Typography>
  ) : (
    <Box
      sx={{
        cursor: "pointer",
        [theme.breakpoints.up("sm")]: {
          maxWidth: "280px",
        },
      }}
    >
      <Typography variant="p" onClick={() => setClick(!click)}>
        {desc !== "" ? desc : lang.none_description}
      </Typography>
      <Dialog open={click} onClose={() => setClick(!click)} maxWidth={"xs"} fullWidth={true}>
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
            onBlur={(e) => {
              updateDescription(date, e.target.value);
              setClick(!click);
            }}
            placeholder={lang.add_description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClick(!click)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateDescription(date, desc);
              setClick(!click);
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
