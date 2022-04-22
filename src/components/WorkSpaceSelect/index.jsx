import React, { useState, useEffect } from "react";
import "./WorkspaceSelect.css";
import { Auth, DataStore, Hub } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import { useAppContext } from "../../services/contextLib";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const WorkspaceSelect = () => {
  const [list, setList] = useState([]);
  const { selectedOption, setSelectedOption, appLoading, groups } = useAppContext();

  useEffect(() => {
    let isActive = false;

    Hub.listen("datastore", (data) => {
      // eslint-disable-next-line default-case
      switch (data.payload.event) {
        case "ready":
          makeList();
          break;
      }
    });

    const makeList = async () => {
      try {
        //check if user is in wokers or client group and if Admin show all workspaces
        if (groups.includes("Admins")) {
          const workspaces = await DataStore.query(AllWorkSpaces);

          let q = [];

          if (workspaces.length > 0) {
            for (let i = 0; i < workspaces.length; i++) {
              q.push({
                id: workspaces[i].id,
                value: workspaces[i].name,
                label: workspaces[i].name,
              });
            }
            !isActive && setList(q);
          }
        } else if (groups.includes("Workers") || groups.includes("Clients")) {
          const user = await Auth.currentAuthenticatedUser();
          const creditails = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);

          let q = [];

          if (creditails.length !== 0) {
            for (let i = 0; i < creditails.memberships.length; i++) {
              const workspaceList = await DataStore.query(AllWorkSpaces, creditails.memberships[i].targetId);
              q.push({
                value: workspaceList.name,
                label: workspaceList.name,
                id: workspaceList.id,
              });
            }
            !isActive && setList(q);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && !appLoading && makeList();

    return () => (isActive = true);
  }, [appLoading, groups]);

  useEffect(() => {
    let isActive = false;

    const lastWorkspaceLoad = async () => {
      const loggedUser = await Auth.currentAuthenticatedUser();
      const creditails = await DataStore.query(UserCredentials, loggedUser.attributes["custom:UserCreditails"]);

      if (creditails.memberships.length !== 0) {
        if (creditails.defaultWorkspace !== null) {
          setSelectedOption({
            id: creditails.defaultWorkspace,
          });
        } else {
          setSelectedOption({
            id: creditails.memberships[0].targetId,
          });
        }
      }
    };

    !isActive && list.length !== 0 && selectedOption === null && lastWorkspaceLoad();

    return () => (isActive = true);
  }, [list, selectedOption]);

  const changeLastValue = async (val) => {
    try {
      const userAtributes = await Auth.currentAuthenticatedUser();
      const original = await DataStore.query(UserCredentials, userAtributes.attributes["custom:UserCreditails"]);
      await DataStore.save(
        UserCredentials.copyOf(original, (newValue) => {
          newValue.defaultWorkspace = val;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ minWidth: 120, marginBottom: "5px", marginTop: "5px" }}>
      {list.length !== 0 && selectedOption !== null && (
        <FormControl variant="standard">
          <InputLabel>Workspaces</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedOption.id}
            label="Workspaces"
            onChange={(event) => {
              setSelectedOption({ id: event.target.value });
              changeLastValue(event.target.value);
            }}
          >
            {list.map((option, key) => (
              <MenuItem value={option.id} key={key}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default WorkspaceSelect;
