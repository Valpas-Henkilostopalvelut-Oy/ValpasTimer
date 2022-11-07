import React, { useState } from "react";
import { TextField, Typography, useTheme, TableRow, TableCell, Box } from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";

const updateDescription = async (date, newDescription) => {
  await DataStore.save(
    TimeEntry.copyOf(date, (updated) => {
      updated.description = newDescription;
    })
  ).catch((e) => console.warn(e));
};

const EditDescription = ({ date }) => {
  const [desc, setDesc] = useState(date.description);
  const [click, setClick] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
        [theme.breakpoints.up("sm")]: {
          maxWidth: "280px",
        },
      }}
    >
      {date.isSent ? (
        <Typography variant="p">{desc !== "" ? desc : "None description"}</Typography>
      ) : !click ? (
        <Typography
          variant="p"
          onClick={() => setClick(!click)}
          sx={{
            width: "100%",
          }}
        >
          {desc !== "" ? desc : "None description"}
        </Typography>
      ) : (
        <TextField
          id="outlined-multiline-static"
          variant="standard"
          autoFocus
          fullWidth
          multiline
          rows={2}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={(e) => {
            updateDescription(date, e.target.value);
            setClick(!click);
          }}
          placeholder="Add description"
        />
      )}
    </Box>
  );
};

export const EditDescriptionSM = ({ date }) => {
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
        <EditDescription date={date} />
      </TableCell>
    </TableRow>
  );
};

export const EditDescriptionMD = ({ date }) => {
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
      <EditDescription date={date} />
    </TableCell>
  );
};

export const Tabledescription = ({ date }) => {
  let arr = date.arr.filter((item) => item.description !== "");
  let description = arr.map((item) => item.description).join(", ");
  return (
    <Box sx={{
      maxWidth: "180px",
    }}>
      <Typography variant="p">{description !== "" ? description : "None description"}</Typography>
    </Box>
  );
};
