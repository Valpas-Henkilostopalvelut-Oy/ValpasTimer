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
  const [selectedOption, setSelectedOption] = useState("");
  const [isClient, setIsClient] = useState(false);

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
    const loadIsClient = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const data = (await DataStore.query(AllWorkSpaces, selectedOption)).clientId.includes(user.username);
        setIsClient(data);
      } catch (error) {
        console.warn(error);
      }
    };

    let isActive = false;

    !isActive && selectedOption !== "" && loadIsClient();

    return () => (isActive = true);
  }, [selectedOption]);

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
          isClient={isClient}
        />
        {usersList !== null ? (
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableBody>
                {usersList.map((users, key) => (
                  <TotalLatest
                    users={users}
                    key={key}
                    selOption={selectedOption}
                    isAdmin={groups.includes("Admins")}
                    isClient={isClient}
                    reload={loadTeamActivities}
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
