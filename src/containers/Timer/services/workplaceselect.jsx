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
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry, AllWorkSpaces, UserCredentials } from "../../../models";

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

const changeCurrentWorkspace = async ({ item }) => {
  await Auth.currentAuthenticatedUser()
    .then(async (u) => {
      let creditails = u.attributes["custom:UserCreditails"];
      await DataStore.save(
        UserCredentials.copyOf(creditails, (update) => {
          update.defaultWorkspace = item;
        })
      ).catch((e) => console.warn(e));
    })
    .catch((e) => console.warn(e));
};

const loadLastId = async ({ arr, setSel }) => {
  await Auth.currentAuthenticatedUser()
    .then(async (u) => {
      let creditails = u.attributes["custom:UserCreditails"];
      await DataStore.query(UserCredentials, creditails).then((res) => {
        let c = arr.filter((item) => item.id === res.defaultWorkspace).length !== 0;
        console.log(res.defaultWorkspace);
        if (c) {
          setSel(res.defaultWorkspace);
        } else {
          setSel("");
          changeCurrentWorkspace({ item: "" });
        }
      });
    })
    .catch((e) => console.warn(e));
};

export const WorklistSelect = ({ sel, setSel }) => {
  const [workplaces, setWorkplaces] = useState([]);

  const handleChange = (event) => {
    setSel(event.target.value);
    changeCurrentWorkspace({ item: event.target.value });
  };

  useEffect(() => {
    let isActive = true;

    const fetchWorkplaces = async () => {
      await DataStore.query(AllWorkSpaces)
        .then(async (res) => {
          let arr = [{ id: "", name: "None" }];
          if (res.length !== 0) {
            res.forEach((item) => {
              arr.push({ id: item.id, name: item.name });
            });
          }

          if (isActive) {
            setWorkplaces(arr);
            loadLastId({ arr, setSel: setSel() });
          }
        })

        .catch((e) => console.warn(e));
    };

    isActive && fetchWorkplaces();

    return () => (isActive = false);
  }, []);

  return (
    sel !== null && (
      <FormControl fullWidth>
        <InputLabel id="workplace-list-select">Working hours</InputLabel>
        <Select
          labelId="workplace-list-select"
          id="workplace-list-select"
          value={sel}
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
    )
  );
};
