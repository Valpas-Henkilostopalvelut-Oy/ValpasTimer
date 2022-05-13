import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Avatar,
} from "@mui/material";
import { EnhancedWorks } from "./Tools";
import { DataStore, Auth } from "aws-amplify";
import { Tasks } from "../../models";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Details = ({ data = null, open = false, id, anchorEl = null, handleClose = () => {} }) => {
  //container with details of the task
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ width: 350 }}>
        <Box sx={{ m: 2, display: "flex", justifyContent: "center" }}>
          <Typography variant="subtitle1">Title</Typography>
        </Box>
      </Box>
    </Popover>
  );
};

const Works = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [dense, setDense] = useState(false);
  const [works, setWorks] = useState(null);

  useEffect(() => {
    let isActive = false;

    const loadWorks = async () => {
      try {
        const tasks = await DataStore.query(Tasks);
        let q = [];
        for (let i = 0; i < tasks.length; i++) {
          q.push({
            title: tasks[i].title,
            description: tasks[i].description,
            startTime: tasks[i].time,
            startDay: new Date(tasks[i].interval.start).toDateString(),
            endDay: new Date(tasks[i].interval.end).toDateString(),
            duration: tasks[i].interval.duration,
            status: tasks[i].status,
            user: tasks[i].user,
            workplace: tasks[i].workplace,
          });
        }

        setWorks(q);
      } catch (e) {
        console.warn(e);
      }
    };

    !isActive && loadWorks();
    return () => (isActive = true);
  }, [addAnchorEl]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedWorks anchorEl={addAnchorEl} setAnchorEl={setAddAnchorEl} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-label="workTable" size={dense ? "small" : "medium"}>
              <TableBody>
                {works !== null &&
                  works.map((u, k) => (
                    <Fragment key={k}>
                      <TableRow onClick={(e) => setAnchorEl(e.currentTarget)} aria-describedby={id}>
                        <TableCell>
                          {u.status === "INWAITTING" && (
                            <CheckCircleOutlineIcon
                              sx={{
                                color: "gray",
                              }}
                            />
                          )}
                          {u.status === "COMPLETE" && (
                            <CheckCircleOutlineIcon
                              sx={{
                                color: "green",
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="left" width={"40%"}>
                          {u.title}
                        </TableCell>
                        <TableCell>{u.startDay}</TableCell>
                        <TableCell>{u.endDay}</TableCell>
                        <TableCell align="right">{u.workplace.name}</TableCell>
                        <TableCell align="right">
                          {u.user.name} {u.user.family_name}
                        </TableCell>
                      </TableRow>
                      <Details data={u} open={open} id={id} anchorEl={anchorEl} handleClose={() => setAnchorEl(null)} />
                    </Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default Works;
