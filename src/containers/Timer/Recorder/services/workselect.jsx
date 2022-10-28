import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../../models";
import { MenuItem, FormControl, Select } from "@mui/material";

export const EditWorkplace = ({ sel, setSel }) => {
  const handleChange = (event) => {
    setSel(event.target.value);
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
          }
        })

        .catch((e) => console.warn(e));
    };

    isActive && fetchWorkplaces();
  }, []);

  return (
    <FormControl fullWidth>
      <Select
        labelId="workplace-select-label"
        id="workplace-select"
        value={sel}
        label="Workplace"
        onChange={handleChange}
        defaultValue=""
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
