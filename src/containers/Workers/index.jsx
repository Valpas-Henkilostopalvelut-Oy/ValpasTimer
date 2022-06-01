import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  ListItemText,
  FormControl,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Auth, API } from "aws-amplify";
import ListToolbar from "./ListToolbar";

const IBAN = ({ row }) => {
  const iban = row.Attributes.find((a) => a.Name === "custom:iban");

  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {iban !== undefined ? iban.Value : "No IBAN"}
    </Typography>
  );
};

const CurrentGroup = ({ row }) => {
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    let isActive = false;

    const listGroup = async (Username) => {
      let apiName = "AdminQueries";
      let path = "/ListGroupsForUser";
      let myInit = {
        queryStringParameters: {
          username: row.Username,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      let w = (await API.get(apiName, path, myInit)).Groups;
      let q = [];

      for (let i = 0; i < w.length; i++) q.push(w[i].GroupName);

      setGroups(q);
    };

    !isActive && listGroup();

    return () => (isActive = true);
  }, [row]);

  useEffect(() => {
    let isActive = false;

    const loadList = async () => {
      let apiName = "AdminQueries";
      let path = "/ListGroups";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      let w = (await API.get(apiName, path, myInit)).Groups;
      let q = [];

      for (let i = 0; i < w.length; i++) q.push(w[i].GroupName);

      setAllGroups(q);
    };

    !isActive && loadList();

    return () => (isActive = true);
  }, [row]);

  const handleChange = (event) => {
    const manage = async ({ group, username, path }) => {
      let apiName = "AdminQueries";
      let myInit = {
        body: {
          username: username,
          groupname: group,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      return await API.post(apiName, path, myInit);
    };

    const {
      target: { value },
    } = event;

    if (groups.length + 1 === value.length) {
      manage({ path: "/addUserToGroup", group: value[value.length - 1], username: row.Username });
    } else if (groups.length - 1 === value.length) {
      for (let i = 0; i < groups.length; i++) {
        for (let ii = 0; ii < value.length; ii++) {
          if (groups[i] === value[ii]) groups.splice(i, 1);
        }
      }

      manage({ path: "/removeUserFromGroup", group: groups[0], username: row.Username });
    }

    setGroups(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box>
      {allGroups.length !== 0 ? (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 120 }}>
          <InputLabel>Groups</InputLabel>
          <Select
            label="Groups"
            multiple
            value={groups}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            onChange={handleChange}
          >
            {allGroups.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={groups.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

const CreateDate = ({ date }) => {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {new Date(date).toDateString()}
    </Typography>
  );
};

const Workers = () => {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const loadUsers = async () => {
    try {
      let apiName = "AdminQueries";
      let path = "/ListUsers";
      let myInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      };

      const list = await API.get(apiName, path, myInit);
      setUsers(list.Users);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    let isActive = false;

    !isActive && loadUsers();

    return () => (isActive = true);
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * usersPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setUsersPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  return users !== null ? (
    <TableContainer component={Paper}>
      <ListToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} reload={loadUsers} />
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Enabled</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Groups</TableCell>
            <TableCell align="right">IBAN</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(usersPerPage > 0 ? users.slice(page * usersPerPage, page * usersPerPage + usersPerPage) : users).map(
            (row, index) => {
              const isItemSelected = isSelected(row);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  key={row.Username}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                      onClick={(event) => handleClick(event, row)}
                    />
                  </TableCell>

                  <TableCell component="th" scope="row" id={labelId} padding="none">
                    <Typography variant="body2" color="textSecondary">
                      {row.Attributes.find((a) => a.Name === "family_name").Value}{" "}
                      {row.Attributes.find((a) => a.Name === "name").Value}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" color="textSecondary">
                      {row.Attributes.find((a) => a.Name === "email").Value}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" color="textSecondary">
                      {row.Attributes.find((a) => a.Name === "phone_number").Value}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {row.Enabled ? (
                      <Typography variant="body2" color="primary">
                        Yes
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="error">
                        No
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" color="textSecondary">
                      {row.UserStatus}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {row.UserStatus === "CONFIRMED" ? (
                      <CurrentGroup row={row} />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        N/A
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {row.UserStatus === "CONFIRMED" ? (
                      <IBAN row={row} />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        N/A
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <CreateDate date={row.UserCreateDate} />
                  </TableCell>
                </TableRow>
              );
            }
          )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={users.length}
              rowsPerPage={usersPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Users per page"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Workers;
