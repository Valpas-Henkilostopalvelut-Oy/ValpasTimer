import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models/index.js";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Collapse,
  Typography,
} from "@mui/material";
import { TopbarMD } from "./topbar.jsx";
import { Userdetails } from "./userdetails.jsx";
import { Adduser } from "./adduser.jsx";
import { PropTypes } from "prop-types";
import { Addwork } from "./addwork.jsx";
import { Workitem } from "./workitem.jsx";

export const Worklist = ({ data, lang }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [includedUsers, setIncludedUsers] = useState([]);

  useEffect(() => {
    let isActive = false;

    const loadUsers = async () => {
      var workers = data.workers;

      await DataStore.query(UserCredentials)
        .then((res) => {
          let u = [];

          for (let i = 0; i < workers.length; i++) {
            const user = res.find((u) => u.userId === workers[i]);

            u.push({
              id: user.userId,
              name: `${user.profile.first_name} ${user.profile.last_name}`,
              email: user.profile.email,
            });
          }

          setIncludedUsers(u);
        })
        .catch((err) => console.warn(err));
    };

    !isActive && loadUsers();

    return () => (isActive = true);
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TopbarMD data={data} open={open} handleOpen={handleOpen} lang={lang} />
          <TableRow>
            <TableCell colSpan={3} padding="none">
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Works data={data} />
                <Users data={data} includedUsers={includedUsers} lang={lang} />
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Works = ({ data }) => {
  const items = data.work;

  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "background.custom",
          }}
        >
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <Typography variant="p">Work name</Typography>
            </TableCell>
            <Addwork data={data} />
          </TableRow>
        </TableHead>
        <TableBody>{items && items.map((item) => <Workitem item={item} key={item.id} data={data} />)}</TableBody>
      </Table>
    </TableContainer>
  );
};

const Users = ({
  data,
  includedUsers,
  lang = {
    worker_name: "Worker name",
  },
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "background.custom",
          }}
        >
          <TableRow>
            <TableCell align="left">
              <Typography variant="p">{lang.worker_name}</Typography>
            </TableCell>
            <Adduser data={data} lang={lang} />
          </TableRow>
        </TableHead>
        <TableBody>
          {includedUsers &&
            includedUsers.map((user) => <Userdetails user={user} data={data} key={user.id} lang={lang} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
