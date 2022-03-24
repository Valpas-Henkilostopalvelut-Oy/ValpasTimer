import React, { useState, useEffect } from "react";
import "./WorkspaceSelect.css";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import Select from "react-select";
import { useAppContext } from "../../services/contextLib";

const WorkspaceSelect = () => {
  const [options, setOptions] = useState([]);
  const { selectedOption, setSelectedOption } = useAppContext();

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

  useEffect(() => {
    const lastWorkspaceLoad = async () => {
      const loggedUser = await Auth.currentAuthenticatedUser();
      const creditails = await DataStore.query(
        UserCredentials,
        loggedUser.attributes["custom:UserCreditails"]
      );
      setSelectedOption({
        value: creditails.defaultWorkspace.value,
        label: creditails.defaultWorkspace.label,
        id: creditails.defaultWorkspace.id,
      });
    };

    selectedOption === null && lastWorkspaceLoad();
  }, [options]);

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

    </div>
  );
};

export default WorkspaceSelect;
