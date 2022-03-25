import React, { useEffect, useState } from "react";
import "./style.css";
import { useAppContext, AppContext } from "../../services/contextLib";
import TotalLatest from "./TotalTracked";
import {
  Switch,
  Container,
  Grid,
  List,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Box,
} from "@mui/material";

import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../models";

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const { selectedOption } = useAppContext();

  useEffect(() => {
    const loadTeamActivities = async () => {
      const usersCredentials = await DataStore.query(UserCredentials);

      let q = [];

      for (let i = 0; i < usersCredentials.length; i++) {
        if (
          usersCredentials[i].memberships.filter(
            (m) => m.targetId === selectedOption.id
          ).length > 0
        ) {
          q.push(usersCredentials[i]);
        }
      }

      setUsers(q);
    };

    loadTeamActivities();
  }, [selectedOption]);

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {users != null && (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Worker</TableCell>
                  <TableCell>Total Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((data, key) => (
                  <TotalLatest
                    data={data}
                    key={key}
                    selOption={selectedOption}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
