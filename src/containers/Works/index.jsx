import React, { useState, useEffect } from "react";
import { Menu, Table, TableBody, TableCell, TableContainer, TableRow, Paper, MenuItem, CircularProgress, IconButton, Tooltip, Container } from "@mui/material";
import { EnhancedWorks } from "./CreateTask/index.jsx";
import { DataStore } from "aws-amplify";
import { Tasks } from "../../models";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteTask } from "./Tools/index.jsx";
import { WorkStatus } from "../../services/workLib.jsx";
import { EditTask } from "./EditTask/index.jsx";
import { PropTypes } from "prop-types";

const More = ({ data = null, reload }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mOpen, setMOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    await deleteTask({ id: data.id });
    handleClose();
    reload();
  };

  const handleEdit = () => {
    setMOpen(true);
    handleClose();
  };
  const handleCloseModal = () => {
    setMOpen(false);
  };

  return (
    <div>
      <Tooltip title="More">
        <IconButton aria-label="more" id="more-button" aria-controls={open ? "more-menu" : undefined} aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <EditTask data={data} open={mOpen} handleClose={handleCloseModal} reload={reload} />

      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

const Works = () => {
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [works, setWorks] = useState(null);

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

  useEffect(() => {
    let isActive = false;

    !isActive && loadWorks();
    return () => (isActive = true);
  }, [addAnchorEl]);

  return works !== null ? (
    <Container>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedWorks anchorEl={addAnchorEl} setAnchorEl={setAddAnchorEl} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="workTable" size={"small"}>
            <TableBody>
              {works !== null &&
                works.map((u, k) => (
                  <TableRow key={k}>
                    <TableCell>
                      <WorkStatus status={u.status} />
                    </TableCell>
                    <TableCell sx={{ width: 150 }}>{u.title}</TableCell>
                    <TableCell sx={{ width: 400 }}>{u.description}</TableCell>
                    <TableCell>
                      {u.user.name} {u.user.family_name}
                    </TableCell>
                    <TableCell>{u.workplace.name}</TableCell>
                    <TableCell>
                      {u.startTime} ({u.duration} / per day)
                    </TableCell>
                    <TableCell>{u.startDay}</TableCell>
                    <TableCell>{u.endDay}</TableCell>
                    <TableCell>
                      <More data={u} reload={loadWorks} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  ) : (
    <Container
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
    </Container>
  );
};

Works.propTypes = {
  data: PropTypes.object,
  reload: PropTypes.func,
};

More.propTypes = {
  data: PropTypes.object,
  reload: PropTypes.func,
};

export default Works;
