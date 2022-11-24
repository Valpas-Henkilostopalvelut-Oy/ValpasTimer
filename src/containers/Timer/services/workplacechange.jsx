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
import { TimeEntry, AllWorkSpaces } from "../../../models";

const updateWorkplace = async ({ date, item }) => {
  await DataStore.save(
    TimeEntry.copyOf(date, (update) => {
      update.workspaceId = item;
    })
  ).catch((e) => console.warn(e));
};

const SelectWork = ({
  date,
  workplaces = null,
  work,
  lang = {
    workplace: "Workplace",
    buttons: {
      save: "Save",
    },
  },
}) => {
  const [workplace, setWorkplace] = useState(work);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [nane, setName] = useState("");
  const handleChange = (event) => {
    setWorkplace(event.target.value);
    updateWorkplace({ date, item: workplace });
  };

  useEffect(() => {
    let isActive = true;

    const fetchWorkplaces = async () => {
      await DataStore.query(AllWorkSpaces)
        .then((res) => {
          let workName = res.find((item) => item.id === date.workspaceId);
          setName(workName.name);
        })
        .catch((e) => console.warn(e));
    };

    isActive && fetchWorkplaces();
    return () => (isActive = false);
  }, []);

  return (
    workplaces !== null && (
      <Box>
        <Typography variant="p" onClick={() => setOpen(!open)}>
          {nane}
        </Typography>
        <Dialog open={open} onClose={() => setOpen(!open)} maxWidth={"xs"} fullWidth={true}>
          <DialogTitle>{lang.workplace}</DialogTitle>
          <DialogContent>
            <FormControl
              fullWidth
              sx={{
                [theme.breakpoints.up("sm")]: {
                  maxWidth: "280px",
                },
              }}
            >
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(!open)} color="primary">
              {lang.buttons.save}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  );
};

const IsSent = ({ date, lang = { workplace: "Workplace" } }) => {
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

    isActive && fetchWorkplaces();
    return () => (isActive = false);
  }, []);

  return (
    <Typography variant="p">
      {lang.workplace}: {work}
    </Typography>
  );
};

export const ChangeWorkplaceSM = ({ date, workplaces = null, work, lang }) => {
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
          <IsSent date={date} lang={lang} />
        )}
      </TableCell>
    </TableRow>
  );
};

export const ChangeWorkplaceMD = ({ date, workplaces = null, work, lang }) => {
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
        <IsSent date={date} lang={lang} />
      )}
    </TableCell>
  );
};
