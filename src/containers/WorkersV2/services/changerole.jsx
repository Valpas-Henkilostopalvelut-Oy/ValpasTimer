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
  const [allgroups, setAllgroups] = useState([]);

  useEffect(() => {
    const loadList = async () => {
      let apiName = "AdminQueries";
      let path = "/ListGroups";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      const { Groups } = await API.get(apiName, path, myInit);
      setAllgroups(Groups.map((group) => group.GroupName));
    };

    isEmpty && loadList();
  }, [isEmpty]);

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
          renderValue={(selected) => selected.join(", ")}
        >
          {allgroups.map((group) => (
            <MenuItem key={group} value={group}>
              <Checkbox checked={usergroups.indexOf(group) > -1} />
              <ListItemText primary={group} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Usergroup;
