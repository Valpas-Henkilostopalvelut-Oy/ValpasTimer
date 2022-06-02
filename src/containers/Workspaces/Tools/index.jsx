import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, InputLabel, Select, Typography } from "@mui/material";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models";

const roles = ["Manager", "Admin", "Client", "No Role"];

export const ChangeRole = ({ userId, workId, isAdmin }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const loadRole = async () => {
      const work = await DataStore.query(AllWorkSpaces, workId);

      if (work.adminId.includes(userId)) {
        setRole("Admin");
      } else if (work.managerId.includes(userId)) {
        setRole("Manager");
      } else if (work.clientId.includes(userId)) {
        setRole("Client");
      } else {
        setRole("No Role");
      }
    };

    let isActive = false;

    !isActive && loadRole();

    return () => (isActive = true);
  }, []);

  const updateRole = async (e) => {
    setRole(e.target.value);

    const original = await DataStore.query(AllWorkSpaces, workId);

    await DataStore.save(
      AllWorkSpaces.copyOf(original, (update) => {
        if (e.target.value === "Admin") {
          update.adminId = [...update.adminId, userId];
          update.managerId = update.managerId.filter((id) => id !== userId);
          update.clientId = update.clientId.filter((id) => id !== userId);
        } else if (e.target.value === "Manager") {
          update.managerId = [...update.managerId, userId];
          update.adminId = update.adminId.filter((id) => id !== userId);
          update.clientId = update.clientId.filter((id) => id !== userId);
        } else if (e.target.value === "Client") {
          update.clientId = [...update.clientId, userId];
          update.adminId = update.adminId.filter((id) => id !== userId);
          update.managerId = update.managerId.filter((id) => id !== userId);
        } else if (e.target.value === "No Role") {
          update.adminId = update.adminId.filter((id) => id !== userId);
          update.managerId = update.managerId.filter((id) => id !== userId);
          update.clientId = update.clientId.filter((id) => id !== userId);
        }
      })
    );
  };

  return isAdmin ? (
    <FormControl variant="standard" fullWidth sx={{ maxWidth: 120 }}>
      <InputLabel id="role-label">Role</InputLabel>
      <Select labelId="role-select" id="role-select" value={role} onChange={updateRole}>
        {roles.map((role, key) => (
          <MenuItem value={role} key={key}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <Typography variant="p">{role}</Typography>
  );
};
