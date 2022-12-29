import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableRow,
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
import { TimeEntry, AllWorkSpaces } from "../../../models/index.js";
import { PropTypes } from "prop-types";

const updateWorkplace = async (date, newValue, oldValue) => {
  if (newValue !== oldValue) {
    await DataStore.save(
      TimeEntry.copyOf(date, (update) => {
        update.workspaceId = newValue;
      })
    ).catch((e) => console.warn(e));
  }
};

const SelectWork = ({
  date,
  workplaces,
  lang = {
    workplace: "Workplace",
    buttons: {
      save: "Save",
      cancel: "Cancel",
    },
  },
}) => {
  const [workplace, setWorkplace] = useState(date.workspaceId);
  const [work, setWork] = useState(date.work ? date.work.id : "");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setWorkplace(event.target.value);
  };

  const handleChangeWork = (event) => {
    setWork(event.target.value);
  };

  var isSent = date.isSent;
  const works = workplaces.find((item) => item.id === workplace).works;
  const workit = works.find((item) => item.id === work);

  return (
    workplaces !== null && (
      <>
        <Typography
          variant="p"
          onClick={() => setOpen(true && !isSent)}
          textOverflow={"ellipsis"}
          sx={{ cursor: !isSent && "pointer" }}
        >
          {work ? workit.name : "No Work item"}
        </Typography>
        <Dialog open={open && !isSent} onClose={() => setOpen(false)} maxWidth={"xs"} fullWidth>
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
                <InputLabel id="workplace-select">{lang.workplace}</InputLabel>
                <Select
                  labelId="workplace-select"
                  id="workplace-select"
                  value={work}
                  label="Work"
                  onChange={handleChangeWork}
                >
                  {works &&
                    works.map((item, i) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              {lang.buttons.cancel}
            </Button>
            <Button onClick={() => updateWorkplace(date, workplace, date.workplaceId, setOpen(false))} color="primary">
              {lang.buttons.save}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  );
};

const IsSent = ({ date, lang = { workplace: "Workplace" } }, isEmpty = false) => {
  const [work, setWork] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchWorkplaces = async () => {
      await DataStore.query(AllWorkSpaces)
        .then((res) => {
          let workName = res.find((item) => item.id === date.workspaceId);
          setWork(workName.name);
        })
        .catch((e) => console.warn(e));
    };

    isActive && isEmpty && fetchWorkplaces();
    return () => (isActive = false);
  }, [isEmpty]);

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
