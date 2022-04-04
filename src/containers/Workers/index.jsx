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
  Checkbox
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { UserCredentials, AllWorkSpaces } from "../../models";

const Workers = () => {
  const [users, setUsers] = useState(null);
  const [workspaceList, setList] = useState(null);
  const [page, setPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let isActive = false;

    const loadWorks = async () => {
      try {
        const works = await DataStore.query(AllWorkSpaces);
        works.length !== 0 && setList(works);
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && loadWorks();

    return () => (isActive = true);
  }, []);

  useEffect(() => {
    let isActive = false;

    const loadUsers = async () => {
      try {
        const userList = await DataStore.query(UserCredentials);
        userList.length !== 0 && setUsers(userList);
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && loadUsers();

    return () => (isActive = true);
  }, []);

  const CurrentWork = ({ workspaceId }) => {
    const curWork = workspaceList.find((w) => w.id === workspaceId);

    return curWork.name;
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * usersPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setUsersPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone number</TableCell>
              <TableCell align="right">Current work</TableCell>
            </TableRow>
          </TableHead>
          {users !== null && (
            <>
              <TableBody>
                {(usersPerPage > 0
                  ? users.slice(
                      page * usersPerPage,
                      page * usersPerPage + usersPerPage
                    )
                  : users
                ).map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={row.id}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Checkbox />
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {row.profile.first_name} {row.profile.last_name}
                      </TableCell>

                      <TableCell align="right">{row.profile.email}</TableCell>

                      <TableCell align="right">
                        {row.profile.phone_number}
                      </TableCell>

                      <TableCell align="right">
                        {workspaceList !== null ? (
                          <CurrentWork workspaceId={row.defaultWorkspace} />
                        ) : (
                          "Loading..."
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
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
            </>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Workers;
