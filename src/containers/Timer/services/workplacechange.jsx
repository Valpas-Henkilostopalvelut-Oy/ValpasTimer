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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setWorkplace(event.target.value);
  };
  var isSent = date.isSent;

  useEffect(() => {
    let isActive = true;

    const fetchWorkplaces = async () => {
      await DataStore.query(AllWorkSpaces)
        .then((res) => {
          let workName = res.find((item) => item.id === date.workspaceId);
          setName(workName !== undefined ? workName.name : "Vaihda työpaikkaa");
        })
        .catch((e) => console.warn(e));
    };

    isActive && fetchWorkplaces();
    return () => (isActive = false);
  }, []);

  return (
    workplaces !== null && (
      <Box sx={{ cursor: !isSent && "pointer" }}>
        <Typography variant="p" onClick={() => setOpen(true && !isSent)}>
          {name}
        </Typography>
        <Dialog open={open && !isSent} onClose={() => setOpen(false)} maxWidth={"xs"} fullWidth>
          <DialogTitle>{lang.workplace}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel id="workplace-select">{lang.workplace}</InputLabel>
              <Select
                labelId="workplace-select"
                id="workplace-select"
                value={workplace}
                label={lang.workplace}
                onChange={handleChange}
                margin="normal"
              >
                {workplaces.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
      </Box>
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

  return <Typography variant="p">{work}</Typography>;
};

export const ChangeWorkplaceSM = ({ date, workplaces = null, work, lang, isEmpty }) => {
  const theme = useTheme();
  const isSent = date.isSent;

  return (
    <TableRow
      sx={{
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <TableCell colSpan={4}>
        {!isSent ? (
          <SelectWork date={date} workplaces={workplaces} work={work} lang={lang} />
        ) : (
          <IsSent date={date} lang={lang} isEmpty={isEmpty} />
        )}
      </TableCell>
    </TableRow>
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

ChangeWorkplaceSM.propTypes = {
  date: PropTypes.object,
  workplaces: PropTypes.array,
  work: PropTypes.string,
  lang: PropTypes.object,
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
