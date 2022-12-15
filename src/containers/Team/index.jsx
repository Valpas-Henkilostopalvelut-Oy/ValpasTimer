import React, { Fragment, useEffect, useState } from "react";
import { DataStore, Auth } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models/index.js";
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
  Box,
  CircularProgress,
} from "@mui/material";
import { useAppContext } from "../../services/contextLib.jsx";

const Team = () => {
  const [users, setUsers] = useState(null);
  const { groups } = useAppContext();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const credentials = await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"]);
        const workId = credentials.defaultWorkspace;
        const work = await DataStore.query(AllWorkSpaces, workId);
        const memberships = work.memberships;

        let q = [];

        for (let i = 0; i < memberships.length; i++) {
          const userr = await DataStore.query(UserCredentials);
          q.push(userr.find((u) => u.userId === memberships[i].userId));
        }

        setUsers(q);
      } catch (error) {
        console.warn(error);
      }
    };

    loadUsers();
  }, []);

  return (
    <Container>
      {users !== null ? (
        <Fragment>
          <Typography variant="h3">Team</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  {groups.includes("Admins") && <TableCell align="right">Rate</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => {
                  return (
                    <TableRow key={row.userId} hover tabIndex={-1}>
                      <TableCell>
                        {row.profile.first_name} {row.profile.last_name}
                      </TableCell>
                      <TableCell align="right">{row.profile.email}</TableCell>
                      {groups.includes("Admins") && <TableCell align="right">10</TableCell>}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
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
    </Container>
  );
};

export default Team;
