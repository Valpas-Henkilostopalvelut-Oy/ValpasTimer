import React, { Fragment, useEffect, useState } from "react";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry } from "../../models";
import { useAppContext } from "../../services/contextLib.jsx";
import {
  Container,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  Box,
  CircularProgress,
} from "@mui/material";
import Recorder from "./Recorder/index.jsx";
import { groupBy } from "../../services/group.jsx";
import WorkspaceSelect from "../../components/WorkSpaceSelect/index.jsx";
import { Row } from "./Row";

const Timer = () => {
  const { isAuthenticated } = useAppContext();
  const [grouped, setGrouped] = useState([]);
  const [selected, setSelected] = useState("");

  const loadTimeList = async () => {
    try {
      const databaseTimeList = await DataStore.query(TimeEntry);
      const currentUser = await Auth.currentAuthenticatedUser();

      const filtered = databaseTimeList
        .sort((date1, date2) => {
          let d1 = new Date(date2.timeInterval.start);
          let d2 = new Date(date1.timeInterval.start);
          return d1 - d2;
        })
        .filter((a) => !a.isActive)
        .filter((u) => u.userId === currentUser.username)
        .filter((w) => w.workspaceId === selected);

      setGrouped(groupBy(filtered));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    let isActive = false;

    !isActive && isAuthenticated && loadTimeList();

    return () => (isActive = true);
  }, [isAuthenticated, selected]);

  //loading if grouped, timelist and selected option are null

  return (
    <Container>
      {grouped != null ? (
        <Fragment>
          <Recorder loadTimeList={loadTimeList} />
          <WorkspaceSelect selectedOption={selected} setSelectedOption={setSelected} />
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 750 }} aria-label="workTable" size={"medium"}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Start</TableCell>
                  <TableCell align="right">End</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Is Sent</TableCell>
                  <TableCell align="right">Confirmed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grouped.map((data, key) => (
                  <Row data={data} key={key} loadTimeList={loadTimeList} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Timer;
