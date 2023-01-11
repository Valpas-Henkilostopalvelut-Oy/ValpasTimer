import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models/index.js";
import { PropTypes } from "prop-types";
import { CustomTableCell } from "./tablecell.jsx";
import { maxText } from "./functions.jsx";
import { EditDescription } from "./editdescription.jsx";

const updateWorkplace = async (date, newValue, work) => {
  await DataStore.save(
    TimeEntry.copyOf(date, (update) => {
      update.workspaceId = newValue;
      update.work = work;
    })
  )
    .then((e) => console.log(e))
    .catch((e) => console.warn(e));
};

export const SelectWork = ({
  date,
  workplaces,
  lang = {
    no_work: "No Work item",
    workplace: "Workplace",
    workitem: "Työtehtävä",
    buttons: {
      save: "Save",
      cancel: "Cancel",
    },
  },
}) => {
  const isSent = date.isSent;
  const workID = workplaces.filter((item) => item.id === date.workspaceId).length > 0 ? date.workspaceId : "";
  const w = date.work;
  const [workplace, setWorkplace] = useState(workID);

  const works = workID ? workplaces.filter((item) => item.id === workID)[0].works : null;

  const workItem = w && works ? works.filter((item) => item.id === w.id)[0] : null;
  const [work, setWork] = useState(workItem ? workItem.id : "");

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(workItem ? workItem.name : lang.no_work);

  useEffect(() => {
    if (workItem) {
      setName(workItem.name);
    } else {
      setName(lang.no_work);
    }
  }, [workItem]);

  const handleChange = (event) => {
    setWorkplace(event.target.value);
  };

  const handleChangeWork = (event) => {
    setWork(event.target.value);
  };

  const handleCancel = () => {
    setWork(date.work ? date.work.id : "");
    setOpen(false);
  };

  const handleSave = () => {
    updateWorkplace(date, workplace, works && works.filter((item) => item.id === work)[0]);
    setOpen(false);
  };

  return (
    workplaces !== null && (
      <>
        <Typography
          variant="p"
          onClick={() => setOpen(true && !isSent)}
          textOverflow={"ellipsis"}
          sx={{ cursor: !isSent && "pointer", color: !work && "default.valpas" }}
        >
          {maxText(name, 10)}
        </Typography>
        <Dialog open={open && !isSent} onClose={handleCancel} maxWidth={"xs"} fullWidth>
          <DialogTitle>{lang.workplace}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="workplace-select">{lang.workplace}</InputLabel>
              <Select
                labelId="workplace-select"
                id="workplace-select"
                value={workplace}
                label={lang.workplace}
                onChange={handleChange}
              >
                {workplaces.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel id="workplace-select">{lang.workitem}</InputLabel>
              <Select
                labelId="workplace-select"
                id="workplace-select"
                value={work}
                label={lang.workitem}
                onChange={handleChangeWork}
                disabled={!works || workplace === ""}
              >
                {works &&
                  works.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <EditDescription date={date} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              {lang.buttons.cancel}
            </Button>
            <Button onClick={handleSave} color="primary">
              {lang.buttons.save}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};

SelectWork.propTypes = {
  date: PropTypes.object,
  workplaces: PropTypes.array,
  work: PropTypes.string,
  lang: PropTypes.object,
};
