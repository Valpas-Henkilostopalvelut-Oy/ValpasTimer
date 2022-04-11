import React, { useState, useEffect } from "react";
import "./WorkspaceSelect.css";
import { Auth, DataStore, Hub } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import { useAppContext } from "../../services/contextLib";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";

const WorkspaceSelect = () => {
  const { selectedOption, setSelectedOption, options, setOptions } =
    useAppContext();

  const makeList = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const creditails = await DataStore.query(
      UserCredentials,
      user.attributes["custom:UserCreditails"]
    );

    let q = [];

    for (let i = 0; i < creditails.memberships.length; i++) {
      const workspaceList = await DataStore.query(
        AllWorkSpaces,
        creditails.memberships[i].targetId
      );
      q.push({
        value: workspaceList.name,
        label: workspaceList.name,
        id: workspaceList.id,
      });
    }

    console.log(q);

    setOptions(q);
  };

  useEffect(() => {
    let isActive = true;

    const lastWorkspaceLoad = async () => {
      const loggedUser = await Auth.currentAuthenticatedUser();
      const creditails = await DataStore.query(
        UserCredentials,
        loggedUser.attributes["custom:UserCreditails"]
      );

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

    !isActive &&
      options.length !== 0 &&
      selectedOption === null &&
      lastWorkspaceLoad();

    return () => (isActive = true);
  }, [options]);

  const changeLastValue = async (val) => {
    try {
      const userAtributes = await Auth.currentAuthenticatedUser();
      const original = await DataStore.query(
        UserCredentials,
        userAtributes.attributes["custom:UserCreditails"]
      );
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
      <Button onClick={makeList}>qq</Button>
      {selectedOption !== null && (
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
            {options.map((option, key) => (
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
