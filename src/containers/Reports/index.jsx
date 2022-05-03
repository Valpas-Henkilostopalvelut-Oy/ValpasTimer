import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib";
import TotalLatest from "./TotalTracked";
import {
  Container,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

import { DataStore, Auth } from "aws-amplify";
import { UserCredentials, AllWorkSpaces } from "../../models";
import { Header } from "./Tools";

const Dashboard = () => {
  const [usersList, setUsers] = useState(null);
  const { groups } = useAppContext();
  const [selected, setSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const loadTeamActivities = async () => {
    const usersCredentials = await DataStore.query(UserCredentials);

    let q = [];

    for (let i = 0; i < usersCredentials.length; i++) {
      if (usersCredentials[i].memberships.filter((m) => m.targetId === selectedOption).length > 0) {
        q.push(usersCredentials[i]);
      }
    }

    setUsers(q);
  };

  useEffect(() => {
    let isActive = false;

    !isActive && selectedOption !== "" && loadTeamActivities();

    return () => (isActive = true);
  }, [selectedOption]);

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} component={Paper}>
        <Header
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isAdmin={groups.includes("Admins")}
        />
        {usersList !== null ? (
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
        ) : (
          <Box
            sx={{
              pt: 6,
              pb: 6,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            component={Paper}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
