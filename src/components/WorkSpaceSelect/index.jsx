import React, { useState, useEffect } from "react";
import "./WorkspaceSelect.css";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import { useAppContext } from "../../services/contextLib";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  IconButton,
  Select,
} from "@mui/material";

const WorkspaceSelect = () => {
  const [options, setOptions] = useState([]);
  const { selectedOption, setSelectedOption, isAuthenticated } =
    useAppContext();

  useEffect(() => {
    const makeList = async () => {
      const workspaceList = await DataStore.query(AllWorkSpaces);
      let q = [];

      for (let i = 0; i < workspaceList.length; i++) {
        q.push({
          value: workspaceList[i].name,
          label: workspaceList[i].name,
          id: workspaceList[i].id,
        });
      }

      setOptions(q);
    };

    makeList();
  }, [isAuthenticated]);

  useEffect(() => {
    const lastWorkspaceLoad = async () => {
      const loggedUser = await Auth.currentAuthenticatedUser();
      const creditails = await DataStore.query(
        UserCredentials,
        loggedUser.attributes["custom:UserCreditails"]
      );
      setSelectedOption({
        id: creditails.defaultWorkspace,
      });
    };

    selectedOption === null && lastWorkspaceLoad();
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
    <Box sx={{ minWidth: 120 }}>
      {selectedOption !== null && (
        <FormControl fullWidth>
          <InputLabel>Workspaces</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
