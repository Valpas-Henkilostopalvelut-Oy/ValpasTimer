import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableCell,
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

const updateWorkplace = async (date, newValue, workit) => {
  await DataStore.save(
    TimeEntry.copyOf(date, (update) => {
      update.workspaceId = newValue;
      update.work = workit;
    })
  ).catch((e) => console.warn(e));
};

const SelectWork = ({
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
  const [workplace, setWorkplace] = useState(date.workspaceId);
  const [work, setWork] = useState(date.work ? date.work.id : "");
  const [open, setOpen] = useState(false);
  const isSent = date.isSent;
  const works = workplaces.find((item) => item.id === workplace).works;
  const workit = works ? works.find((item) => item.id === work) : null;

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
    updateWorkplace(date, date.workspaceId, workit);
    setOpen(false);
  };

  return (
    workplaces !== null && (
      <>
        <Typography
          variant="p"
          onClick={() => setOpen(true && !isSent)}
          textOverflow={"ellipsis"}
          sx={{ cursor: !isSent && "pointer" }}
        >
          {work ? workit.name : lang.no_work}
        </Typography>
        <Dialog open={open && !isSent} onClose={handleCancel} maxWidth={"xs"} fullWidth>
          <DialogTitle>{lang.workplace}</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                padding: "1rem",
              }}
            >
              <FormControl fullWidth>
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
            </Box>

            <Box padding="1rem">
              <FormControl fullWidth>
                <InputLabel id="workplace-select">{lang.workitem}</InputLabel>
                <Select
                  labelId="workplace-select"
                  id="workplace-select"
                  value={work}
                  label={lang.workitem}
                  onChange={handleChangeWork}
                  disabled={!works}
                >
                  {works &&
                    works.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
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

const IsSent = ({ date, lang = { workplace: "Workplace", no_work: "No Work item" } }, isEmpty = false) => {
  const work = date.work ? date.work.name : lang.no_work;

  return (
    <Typography variant="p" textOverflow={"ellipsis"}>
      {work}
    </Typography>
  );
};

export const ChangeWorkplaceMD = ({ date, workplaces = null, work, lang, isEmpty }) => {
  const theme = useTheme();
  const isSent = date.isSent;

  return (
    <TableCell
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}
    >
      {!isSent ? (
        <SelectWork date={date} workplaces={workplaces} work={work} lang={lang} />
      ) : (
        <IsSent date={date} lang={lang} isEmpty={isEmpty} />
      )}
    </TableCell>
  );
};

ChangeWorkplaceMD.propTypes = {
  date: PropTypes.object,
  workplaces: PropTypes.array,
  work: PropTypes.string,
  lang: PropTypes.object,
};

SelectWork.propTypes = {
  date: PropTypes.object,
  workplaces: PropTypes.array,
  work: PropTypes.string,
  lang: PropTypes.object,
};

IsSent.propTypes = {
  date: PropTypes.object,
  lang: PropTypes.object,
};
