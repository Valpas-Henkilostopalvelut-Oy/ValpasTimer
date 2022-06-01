import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import { DataStore, Auth } from "aws-amplify";
import { Tasks } from "../../models";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { WorkStatus } from "../../services/workLib";

const TasksPage = () => {
  const [tasks, setTasks] = useState(null);
  const [dense, setDense] = useState(false);

  useEffect(() => {
    let isActive = false;
    const loadTasks = async () => {
      try {
        const tasks = await DataStore.query(Tasks);
        const user = await Auth.currentAuthenticatedUser();

        let q = [];
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].username === user.username) {
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
        }
        setTasks(q);
      } catch (e) {
        console.warn(e);
      }
    };

    !isActive && loadTasks();
    return () => (isActive = true);
  }, []);
  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-label="workTable" size={dense ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Work</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Start Day</TableCell>
                  <TableCell>End Day</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks !== null &&
                  tasks.map((task, k) => (
                    <TableRow key={k}>
                      <TableCell>
                        <WorkStatus status={task.status} />
                      </TableCell>
                      <TableCell sx={{ width: 150 }}>{task.title}</TableCell>
                      <TableCell sx={{ width: 400 }}>{task.description}</TableCell>
                      <TableCell>{task.workplace.name}</TableCell>
                      <TableCell>
                        {task.startTime} <br />({task.duration} / per day)
                      </TableCell>
                      <TableCell>{task.startDay}</TableCell>
                      <TableCell>{task.endDay}</TableCell>
                      <TableCell>
                        <MoreVertIcon />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default TasksPage;
