import React from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { TableCell, TableRow, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, useTheme } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ruLocale from "date-fns/locale/ru";
import { PropTypes } from "prop-types";

export const EditDateMD = ({ data, lang }) => {
  const theme = useTheme();
  return (
    <Box
      align="right"
      component={TableCell}
      sx={{
        width: "60px",
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      <EditDate data={data} lang={lang} />
    </Box>
  );
};

export const EditDateSM = ({ data, lang }) => {
  const theme = useTheme();
  return (
    <Box
      component={TableRow}
      sx={{
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <TableCell colSpan={4}>
        <EditDate data={data} lang={lang} />
      </TableCell>
    </Box>
  );
};

const updateDate = async ({ value, data }) => {
  let year = new Date(value).getFullYear();
  let date = new Date(value).getDate();
  let month = new Date(value).getMonth();

  let start = new Date(new Date(data.timeInterval.start).setFullYear(year, month, date)).toISOString();
  let end = new Date(new Date(data.timeInterval.end).setFullYear(year, month, date)).toISOString();

  await DataStore.save(
    TimeEntry.copyOf(data, (update) => {
      update.timeInterval.start = start;
      update.timeInterval.end = end;
    })
  ).catch((e) => console.warn(e));
};

const EditDate = ({ data, lang = { date: "Date" } }) => {
  const [value, setValue] = React.useState(new Date(data.timeInterval.start));
  const [open, setOpen] = React.useState(false);
  const isSent = data.isSent;
  const handleClose = () => {
    updateDate({ value: value, data: data });
    setOpen(false);
  };

  return (
    <Box
      sx={{
        cursor: !isSent ? "pointer" : "default",
      }}
    >
      <Typography variant="p" onClick={() => setOpen(true)}>
        {new Date(data.timeInterval.start).getDate()}.{new Date(data.timeInterval.start).getMonth() + 1}.{new Date(data.timeInterval.start).getFullYear()}
      </Typography>
      <Dialog open={open && !isSent} onClose={() => setOpen(false)} maxWidth={"xs"} fullWidth={true}>
        <DialogTitle>{lang.date}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
            <DatePicker label={lang.date} value={value} onChange={(newValue) => setValue(newValue)} renderInput={(params) => <TextField {...params} fullWidth margin="normal" />} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

EditDate.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.object,
};

EditDateMD.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.object,
};

EditDateSM.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.object,
};
