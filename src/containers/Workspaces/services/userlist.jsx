import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../../models";
import { Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Paper, Collapse } from "@mui/material";
import { TopbarMD } from "./topbar.jsx";
import { Userdetails } from "./userdetails.jsx";
import { Adduser } from "./adduser.jsx";

export const Worklist = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TopbarMD data={data} open={open} handleOpen={handleOpen} />

          <TableRow>
            <TableCell
              colSpan={3}
              style={{
                padding: 0,
              }}
            >
              <Userlist data={data} open={open} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Userlist = ({ data, open = false }) => {
  const [includedUsers, setIncludedUsers] = useState([]);
  var workers = data.workers;
  var admins = data.adminId;

  useEffect(() => {
    let isActive = false;

    const loadUsers = async () => {
      try {
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
          .catch((err) => console.log(err));
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && loadUsers();

    return () => (isActive = true);
  }, [data]);

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "background.custom",
            }}
          >
            <TableRow>
              <TableCell align="left">Workers name</TableCell>
              <Adduser data={data} />
            </TableRow>
          </TableHead>
          <TableBody>
            {includedUsers.length !== 0 &&
              includedUsers.map((user) => <Userdetails user={user} data={data} key={user.id} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  );
};
