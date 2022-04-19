import React, { useEffect, useState } from "react";
import "./style.css";
import { useAppContext } from "../../services/contextLib";
import TotalLatest from "./TotalTracked";
import { Container, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Box } from "@mui/material";

import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../models";
import HeadToolBar from "./ToolBar";

const Dashboard = () => {
  const [usersList, setUsers] = useState(null);
  const { selectedOption } = useAppContext();
  const [selected, setSelected] = useState([]);

  const loadTeamActivities = async () => {
    const usersCredentials = await DataStore.query(UserCredentials);

    let q = [];

    for (let i = 0; i < usersCredentials.length; i++) {
      if (usersCredentials[i].memberships.filter((m) => m.targetId === selectedOption.id).length > 0) {
        q.push(usersCredentials[i]);
      }
    }

    setUsers(q);
  };

  useEffect(() => {
    let isActive = false;

    !isActive && selectedOption !== null && loadTeamActivities();

    return () => (isActive = true);
  }, [selectedOption]);

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {usersList != null && (
          <Paper>
            <HeadToolBar
              numSelected={selected.length}
              selected={selected}
              setSelected={setSelected}
              reload={loadTeamActivities}
            />
            <TableContainer>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="right">Worker</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersList.map((users, key) => (
                    <TotalLatest
                      users={users}
                      key={key}
                      selOption={selectedOption}
                      setSelected={setSelected}
                      selected={selected}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
