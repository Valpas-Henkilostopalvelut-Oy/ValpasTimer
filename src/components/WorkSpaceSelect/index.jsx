import React, { useState, useEffect } from "react";
import "./WorkspaceSelect.css";
import { Auth, DataStore, Hub } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import { useAppContext } from "../../services/contextLib";
import { Box, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";

const WorkspaceSelect = () => {
  const [list, setList] = useState([]);
  const { selectedOption, setSelectedOption, appLoading, setAppLoading } = useAppContext();

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
      const user = await Auth.currentAuthenticatedUser();
      const creditails = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);

      let q = [];

      for (let i = 0; i < creditails.memberships.length; i++) {
        const workspaceList = await DataStore.query(AllWorkSpaces, creditails.memberships[i].targetId);
        q.push({
          value: workspaceList.name,
          label: workspaceList.name,
          id: workspaceList.id,
        });
      }

      !isActive && setList(q);
    };

    !isActive && !appLoading && makeList();

    return () => (isActive = true);
  }, [appLoading]);

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
  }, [list]);

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
