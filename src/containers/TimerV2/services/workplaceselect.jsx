import React, { useEffect, useState } from "react";
import {
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

const SelectWork = ({ date }) => {
  const [workplace, setWorkplace] = useState("");
  const [workplaces, setWorkplaces] = useState([]);
  const [edited, setEdited] = useState(false);
  const handleChange = (event) => {
    setWorkplace(event.target.value);
    setEdited(true);
  };

  const update = () => {
    updateWorkplace({ date, item: workplace });
    setEdited(false);
  };

  useEffect(() => {
    let isActive = true;

    const fetchWorkplaces = async () => {
      await DataStore.query(AllWorkSpaces)
        .then((res) => {
          let arr = [];
          res.forEach((item) => {
            arr.push({ id: item.id, name: item.name });
          });

          if (isActive) {
            setWorkplaces(arr);
            let item = arr.find((item) => item.id === date.workspaceId);
            setWorkplace(item.id);
          }
        })

        .catch((e) => console.warn(e));
    };

    isActive && fetchWorkplaces();

    return () => (isActive = false);
  }, []);

  return (
    workplaces.length !== 0 && (
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <FormControl fullWidth sx={{ maxWidth: "280px" }}>
          <InputLabel id="workplace-select">Workplace select</InputLabel>
          <Select
            labelId="workplace-select"
            id="workplace-select"
            value={workplace}
            label="Workplace select"
            onChange={handleChange}
          >
            {workplaces.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {edited && (
          <Button variant="text" onClick={update}>
            Save
          </Button>
        )}
      </Box>
    )
  );
};

const IsSent = ({ date }) => {
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

  return <Typography>Workplace: {work}</Typography>;
};

export const ChangeWorkplaceSM = ({ date }) => {
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
      <TableCell colSpan={4}>{!isSent ? <SelectWork date={date} /> : <IsSent date={date} />}</TableCell>
    </TableRow>
  );
};

export const ChangeWorkplaceMD = ({ date }) => {
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
      {!isSent ? <SelectWork date={date} /> : <IsSent date={date} />}
    </TableCell>
  );
};
