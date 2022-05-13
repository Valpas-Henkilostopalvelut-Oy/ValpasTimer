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
} from "@mui/material";
import { DataStore, Auth } from "aws-amplify";
import { Tasks } from "../../models";

const TasksPage = () => {
  const [tasks, setTasks] = useState(null);
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Work</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Start Day</TableCell>
                  <TableCell>End Day</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks !== null &&
                  tasks.map((task, k) => (
                    <TableRow key={k}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.workplace.name}</TableCell>
                      <TableCell>{task.startTime}</TableCell>
                      <TableCell>{task.startDay}</TableCell>
                      <TableCell>{task.endDay}</TableCell>
                      <TableCell>{task.duration}</TableCell>
                      <TableCell>{task.status}</TableCell>
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
