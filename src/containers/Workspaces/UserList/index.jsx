import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { TableRow, Checkbox, TableCell } from "@mui/material";
import { useAppContext } from "../../../services/contextLib.jsx";
import { ChangeRole } from "./../Tools/index.jsx";

export const UserList = ({ member, data, index, selected, setSelected }) => {
  const [user, setUser] = useState(null);
  const { groups } = useAppContext();

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const isItemSelected = isSelected(member.userId);
  const labelId = `enhanced-table-checkbox-${index}`;

  useEffect(() => {
    let isActive = false;

    const loadUser = async () => {
      try {
        const credentials = await DataStore.query(UserCredentials);
        setUser(credentials.find((u) => u.userId === member.userId));
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && user === null && loadUser();

    return () => (isActive = true);
  }, [member, user]);

  return user !== null ? (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onClick={(event) => handleClick(event, member.userId)}
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>

      <TableCell>
        {user.profile.first_name} {user.profile.last_name}
      </TableCell>
      <TableCell>{user.profile.email}</TableCell>
      <TableCell>
        <ChangeRole userId={member.userId} workId={data.id} isAdmin={groups.includes("Admins")} />
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell colSpan={3}>Loading...</TableCell>
    </TableRow>
  );
};
