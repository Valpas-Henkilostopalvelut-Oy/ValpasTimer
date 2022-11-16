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
        <Typography variant="p">{desc !== "" ? desc : lang.none_description}</Typography>
      ) : !click ? (
        <Typography
          variant="p"
          onClick={() => setClick(!click)}
          sx={{
            width: "100%",
          }}
        >
          {desc !== "" ? desc : lang.none_description}
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
          placeholder={lang.add_description}
        />
      )}
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
