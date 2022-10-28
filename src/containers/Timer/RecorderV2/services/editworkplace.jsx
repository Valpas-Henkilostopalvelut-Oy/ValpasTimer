import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../../models";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export const EditWorkplace = ({ workplace, setWorkplace }) => {
  const handleChange = (event) => {
    setWorkplace(event.target.value);
  };
  const [workplaces, setWorkplaces] = useState([]);

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
            setWorkplace("");
          }
        })

        .catch((e) => console.warn(e));
    };

    isActive && fetchWorkplaces();
  }, [workplace]);

  return (
    <FormControl fullWidth>
      <InputLabel id="workplace-select-label">Workplace</InputLabel>
      <Select
        labelId="workplace-select-label"
        id="workplace-select"
        value={workplace}
        label="Workplace"
        onChange={handleChange}
      >
        {workplaces.map((item, i) => (
          <MenuItem key={i} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
