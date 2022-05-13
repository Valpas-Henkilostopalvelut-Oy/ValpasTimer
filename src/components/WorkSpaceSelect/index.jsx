import React, { useState, useEffect } from "react";
import "./WorkspaceSelect.css";
import { Auth, DataStore, Hub } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import { useAppContext } from "../../services/contextLib";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const WorkspaceSelect = ({ selectedOption, setSelectedOption }) => {
  const [list, setList] = useState([]);
  const { groups } = useAppContext();

  useEffect(() => {
    let isActive = false;

    const makeList = async () => {
      try {
        //check if user is in wokers or client group and if Admin show all workspaces

        const user = await Auth.currentAuthenticatedUser();
        const creditails = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);

        let q = [];

        if (creditails.memberships.length > 0) {
          for (let i = 0; i < creditails.memberships.length; i++) {
            const workspaceList = await DataStore.query(AllWorkSpaces, creditails.memberships[i].targetId);
            q.push({
              value: workspaceList.id,
              label: workspaceList.name,
            });
          }

          setList(q);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && makeList();

    return () => (isActive = true);
  }, []);

  useEffect(() => {
    let isActive = false;

    const lastWorkspaceLoad = async () => {
      const loggedUser = await Auth.currentAuthenticatedUser();
      const creditails = await DataStore.query(UserCredentials, loggedUser.attributes["custom:UserCreditails"]);

      if (creditails.defaultWorkspace !== null) {
        setSelectedOption(creditails.defaultWorkspace);
      } else if (creditails.memberships.length !== 0) {
        setSelectedOption("none");
      }
    };

    !isActive && list.length !== 0 && lastWorkspaceLoad();

    return () => (isActive = true);
  }, [list, selectedOption]);

  const changeLastValue = async (val) => {
    try {
      const userAtributes = await Auth.currentAuthenticatedUser();
      const original = await DataStore.query(UserCredentials, userAtributes.attributes["custom:UserCreditails"]);
      await DataStore.save(
        UserCredentials.copyOf(original, (newValue) => {
          if (val !== "none") {
            newValue.defaultWorkspace = val;
          } else newValue.defaultWorkspace = null;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    list.length > 0 && (
      <FormControl>
        <InputLabel>Workspaces</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedOption}
          label="Workspaces"
          onChange={(event) => {
            setSelectedOption(event.target.value);
            changeLastValue(event.target.value);
          }}
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          {list.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};

export default WorkspaceSelect;
