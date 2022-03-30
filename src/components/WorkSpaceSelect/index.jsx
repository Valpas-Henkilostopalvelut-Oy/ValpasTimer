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
  Typography,
} from "@mui/material";

const WorkspaceSelect = () => {
  const [options, setOptions] = useState([]);
  const {
    selectedOption,
    setSelectedOption,
    admin,
  } = useAppContext();

  useEffect(() => {
    const makeList = async () => {
      if (!admin) {
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

        setOptions(q);
      } else {
        const workspaceAllList = await DataStore.query(AllWorkSpaces);

        let w = [];

        for (let i = 0; i < workspaceAllList.length; i++) {
          w.push({
            value: workspaceAllList[i].name,
            label: workspaceAllList[i].name,
            id: workspaceAllList[i].id,
          });
        }

        setOptions(w);
      }
    };

    makeList();
  }, [admin]);

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
      {selectedOption !== null && admin !== null && (
        <FormControl>
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
