import React, { useState, useEffect } from "react";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const changeCurrentWorkspace = async ({ item }) => {
  await Auth.currentAuthenticatedUser()
    .then(async (u) => {
      let creditails = u.attributes["custom:UserCreditails"];
      await DataStore.save(
        UserCredentials.copyOf(creditails, (update) => {
          update.defaultWorkspace = item;
        })
      ).catch((e) => console.warn(e));
    })
    .catch((e) => console.warn(e));
};

const loadLastId = async ({ arr, setSel }) => {
  await Auth.currentAuthenticatedUser()
    .then(async (u) => {
      let creditails = u.attributes["custom:UserCreditails"];
      await DataStore.query(UserCredentials, creditails).then((res) => {
        let c = arr.filter((item) => item.id === res.defaultWorkspace).length !== 0;
        console.log(res.defaultWorkspace);
        if (c) {
          setSel(res.defaultWorkspace);
        } else {
          setSel("");
          changeCurrentWorkspace({ item: "" });
        }
      });
    })
    .catch((e) => console.warn(e));
};

export const WorklistSelect = ({ sel, setSel }) => {
  const [workplaces, setWorkplaces] = useState([]);

  const handleChange = (event) => {
    setSel(event.target.value);
    changeCurrentWorkspace({ item: event.target.value });
  };

  useEffect(() => {
    let isActive = true;

    const fetchWorkplaces = async () => {
      await DataStore.query(AllWorkSpaces)
        .then(async (res) => {
          let arr = [{ id: "", name: "None" }];
          if (res.length !== 0) {
            res.forEach((item) => {
              arr.push({ id: item.id, name: item.name });
            });
          }

          if (isActive) {
            setWorkplaces(arr);
            loadLastId({ arr, setSel: setSel() });
          }
        })

        .catch((e) => console.warn(e));
    };

    isActive && fetchWorkplaces();

    return () => (isActive = false);
  }, []);

  return (
    sel !== null && (
      <FormControl fullWidth>
        <InputLabel id="workplace-list-select">Working hours</InputLabel>
        <Select
          labelId="workplace-list-select"
          id="workplace-list-select"
          value={sel}
          label="Workplace select"
          onChange={handleChange}
        >
          {workplaces.map((item, i) => (
            <MenuItem key={i} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  );
};
