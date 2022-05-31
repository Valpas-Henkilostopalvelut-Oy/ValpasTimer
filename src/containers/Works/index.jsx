import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  MenuItem,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { EnhancedWorks } from "./CreateTask";
import { DataStore, Auth } from "aws-amplify";
import { Tasks } from "../../models";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const More = ({ data = null }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="more-button"
        aria-controls={open ? "more-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="more-menu" anchorEl={anchorEl} open={open} onClose={handleClose} >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </div>
  );
};

const Works = () => {
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
            id: tasks[i].id,
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

  return (
    <Container>
      {works !== null ? (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedWorks anchorEl={addAnchorEl} setAnchorEl={setAddAnchorEl} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-label="workTable" size={dense ? "small" : "medium"}>
                <TableBody>
                  {works !== null &&
                    works.map((u, k) => {
                      return (
                        <Fragment key={k}>
                          <TableRow>
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
                            <TableCell align="left">{u.title}</TableCell>
                            <TableCell>{u.startDay}</TableCell>
                            <TableCell>{u.endDay}</TableCell>
                            <TableCell align="right">{u.workplace.name}</TableCell>
                            <TableCell align="right">
                              {u.user.name} {u.user.family_name}
                            </TableCell>
                            <TableCell align="right">
                              <More data={u} />
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ) : (
        <Box
          component={Paper}
          sx={{
            width: "100%",
            pt: 6,
            pb: 6,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Works;
