import React, { useState, useEffect } from "react";
import "./WorkspaceSelect.css";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import Select from "react-select";
import { Button } from "@chakra-ui/react";
import { LinkContainer } from "react-router-bootstrap";

const WorkspaceSelect = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastWorkspace, setLastWorkspace] = useState(null);

  useEffect(() => {
    const userDefaultWorkspace = async () => {
      const user = await DataStore.query(UserCredentials);
      setSelectedOption(user[0].defaultWorkspace);
    };
  }, [options, selectedOption]);

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
  }, []);

  const changeValue = async (value) => {
    setSelectedOption(value);

    try {
      const userAtributes = await Auth.currentAuthenticatedUser();
      const original = await DataStore.query(
        UserCredentials,
        userAtributes.attributes["custom:UserCreditails"]
      );
      await DataStore.save(
        UserCredentials.copyOf(original, (newValue) => {
          newValue.defaultWorkspace = {
            value: value.value,
            label: value.label,
            id: value.id,
          };
        })
      );
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="WorkspaceSelect">
      <Select
        defaultValue={selectedOption}
        onChange={changeValue}
        options={options}
        placeholder={"Workspace"}
      />
      <LinkContainer to="/workspaces">
        <Button>Manage Workspace</Button>
      </LinkContainer>
    </div>
  );
};

export default WorkspaceSelect;
