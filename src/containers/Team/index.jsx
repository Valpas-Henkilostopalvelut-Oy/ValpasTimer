import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../models";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Typography,
  Checkbox,
  Divider,
} from "@mui/material";
import { useAppContext } from "../../services/contextLib";
import "./team.css";
import "../../App.css";
import TeamToolbar from "./Toolbar";

const Team = () => {
  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState([]);
  const { selectedOption, groups } = useAppContext();

  const loadUsers = async () => {
    try {
      const userCredentials = await DataStore.query(UserCredentials);

      let q = [];

      for (let i = 0; i < userCredentials.length; i++) {
        for (let ii = 0; ii < userCredentials[i].memberships.length; ii++) {
          if (
            userCredentials[i].memberships[ii].targetId === selectedOption.id
          ) {
            q.push(userCredentials[i]);
          }
        }
      }

      if (q.length !== 0) {
        setUsers(q);
      } else {
        setUsers(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedOption !== null && loadUsers();
  }, [selectedOption]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };


  return (
    <Container>
      <Typography variant="h3">Team</Typography>
      <TableContainer component={Paper}>
        <TeamToolbar
          numSelected={selected.length}
          reload={loadUsers}
          selected={selected}
          groups={groups}
          option={selectedOption}
          setSelected={setSelected}
        />
        <Divider />
        {users !== null && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                {groups.includes("Admins") && (
                  <TableCell align="right">Rate</TableCell>
                )}
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Phone number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={row.userId}
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell>
                      {row.profile.first_name} {row.profile.last_name}
                    </TableCell>
                    <TableCell align="right">{row.profile.email}</TableCell>
                    {groups.includes("Admins") && (
                      <TableCell align="right">10</TableCell>
                    )}
                    <TableCell align="right">role (in futer)</TableCell>
                    <TableCell align="right">
                      {row.profile.phone_number}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default Team;
