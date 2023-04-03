import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputBase,
} from "@mui/material";
import { Auth, API } from "aws-amplify";

const list = (lang) => [
  {
    value: "Admins",
    label: lang.admin,
  },
  {
    value: "Clients",
    label: lang.client,
  },
  {
    value: "Workers",
    label: lang.worker,
  },
];

const manage = async ({ group, username, path }) => {
  let apiName = "AdminQueries";
  let myInit = {
    body: { username: username, groupname: group },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
    },
  };
  return await API.post(apiName, path, myInit);
};

const Usergroup = (props) => {
  const { Username, isEmpty } = props;
  const [usergroups, setUsergroups] = useState([]);
  const lang = { admin: "Yläpitäjä", client: "Asiakas", worker: "Työntekijä" };
  const allgroups = list(lang);

  useEffect(() => {
    const listGroup = async () => {
      let apiName = "AdminQueries";
      let path = "/ListGroupsForUser";
      let myInit = {
        queryStringParameters: { username: Username },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      const { Groups } = await API.get(apiName, path, myInit);
      setUsergroups(Groups.map((group) => group.GroupName));
    };

    isEmpty && listGroup();
  }, [isEmpty]);

  const handleChange = (event) => {
    const manage = async ({ group, username, path }) => {
      let apiName = "AdminQueries";
      let myInit = {
        body: { username: username, groupname: group },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };
      await API.post(apiName, path, myInit);
    };

    const {
      target: { value },
    } = event;

    if (usergroups.length + 1 === value.length) {
      manage({ path: "/addUserToGroup", group: value[value.length - 1], username: Username });
    } else if (usergroups.length - 1 === value.length) {
      for (let i = 0; i < usergroups.length; i++) {
        for (let ii = 0; ii < value.length; ii++) {
          if (usergroups[i] === value[ii]) usergroups.splice(i, 1);
        }
      }

      manage({ path: "/removeUserFromGroup", group: usergroups[0], username: Username });
    }

    setUsergroups(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel id="usergroup-label">Käyttäjäryhmät</InputLabel>
        <Select
          labelId="usergroup-label"
          id="usergroup"
          label="Käyttäjäryhmät"
          multiple
          value={usergroups}
          onChange={handleChange}
          renderValue={(selected) => {
            let q = list(lang).filter((group) => selected.includes(group.value));
            return q.map((group) => group.label).join(", ");
          }}
        >
          {allgroups.map((group) => (
            <MenuItem key={group.value} value={group.value}>
              <Checkbox checked={usergroups.includes(group.value)} />
              <ListItemText primary={group.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Usergroup;
