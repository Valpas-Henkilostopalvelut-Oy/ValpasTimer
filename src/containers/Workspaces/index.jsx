import React, { Fragment, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import "./Workspaces.css";
import "../../App.css";
import { alpha } from "@mui/material/styles";
import {
  Container,
  Toolbar,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
  Collapse,
  TextField,
  Checkbox,
  Tooltip,
  Typography,
  Modal,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import { useAppContext } from "../../services/contextLib";

const UserList = ({ member, data, index, selected, setSelected }) => {
  const [user, setUser] = useState(null);

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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const isItemSelected = isSelected(member.userId);
  const labelId = `enhanced-table-checkbox-${index}`;

  useEffect(() => {
    let isActive = false;

    const loadUser = async () => {
      try {
        const credentials = await DataStore.query(UserCredentials);
        setUser(credentials.find((u) => u.userId === member.userId));
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && user === null && loadUser();

    return () => (isActive = true);
  }, []);

  return user !== null ? (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onClick={(event) => handleClick(event, member.userId)}
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>

      <TableCell>
        {user.profile.first_name} {user.profile.last_name}
      </TableCell>
      <TableCell>{user.profile.email}</TableCell>
      <TableCell>{user.profile.phone_number}</TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell colSpan={3}>Loading...</TableCell>
    </TableRow>
  );
};

const AddUser = ({ open, setOpen, data, id }) => {
  const { groups } = useAppContext();
  const [userEmail, setUserEmail] = useState("");

  const handleChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleAddUser = async () => {
    if (groups.includes("Admins")) {
      const credentials = (await DataStore.query(UserCredentials)).find(
        (u) => u.profile.email === userEmail
      );
      const original = await DataStore.query(AllWorkSpaces, id);
      if (
        groups.includes("Admins") &&
        credentials !== undefined &&
        original !== undefined
      ) {
        try {
          await DataStore.save(
            AllWorkSpaces.copyOf(original, (updated) => {
              updated.memberships.push({
                hourlyRate: original.hourlyRate,
                membershipStatus: "",
                membershipType: "USER",
                userId: credentials.userId,
                targetId: original.id,
              });
            })
          );
        } catch (error) {
          console.warn(error);
        }
        try {
          await DataStore.save(
            UserCredentials.copyOf(credentials, (updated) => {
              updated.memberships.push({
                hourlyRate: original.hourlyRate,
                costRate: {},
                membershipStatus: "",
                membershipType: "WORKSPACE",
                userId: credentials.userId,
                targetId: id,
              });
            })
          );
        } catch (error) {
          console.warn(error);
        }
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography>Add user</Typography>

        <Grid container alignItems={"center"} spacing={1}>
          <Grid item md={10}>
            <TextField
              fullWidth
              variant="standard"
              id="outlined-name"
              label="Email"
              value={userEmail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={2}>
            <Button onClick={handleAddUser} variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const TableToolBar = ({ selected, data, numSelected, setSelected }) => {
  const [open, setOpen] = useState(false);
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          User list
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment>
          <Tooltip title="Add user">
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <AddUser open={open} setOpen={setOpen} data={data} id={data.id} />
        </Fragment>
      )}
    </Toolbar>
  );
};

const Row = ({ data, reload }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const updateValue = async ({ values, setSubmitting, data }) => {
    try {
      setSubmitting(true);

      await DataStore.save(
        AllWorkSpaces.copyOf(data, (updated) => {
          updated.name = values.name;
        })
      );

      setSubmitting(true);

      reload();
    } catch (error) {
      setSubmitting(false);

      console.warn(error);
    }
  };

  const deleteItem = async () => {
    try {
      DataStore.delete(data);

      reload();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Fragment>
      <TableRow
        key={data.name}
        sx={{ "&:last-child tg, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" width={950}>
          {data.name}
        </TableCell>

        <TableCell align="right">
          <Button onClick={() => setOpen(!open)}>Settings</Button>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={deleteItem}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Formik
              initialValues={{
                name: data.name,
              }}
              onSubmit={(values, { setSubmitting }) => {
                updateValue({ values, setSubmitting, data });
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    id="name"
                    name="Workspace name"
                    label="Work name"
                    value={values.name}
                    onBlur={handleBlur("name")}
                    onChange={handleChange("name")}
                    variant="standard"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Formik>

            <TableToolBar
              selected={selected}
              setSelected={setSelected}
              numSelected={selected.length}
              data={data}
              id={data.id}
            />

            <TableContainer
              component={Paper}
              sx={{ maxHeight: 440, width: "100%" }}
            >
              <Table aria-label="stivky table">
                <TableHead>
                  <TableRow>
                    <TableCell />

                    <TableCell>Name</TableCell>

                    <TableCell>Email</TableCell>

                    <TableCell>Phone number</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.memberships.length !== 0 ? (
                    data.memberships.map((user, index) => (
                      <UserList
                        key={index}
                        member={user}
                        data={data}
                        index={index}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>No workers</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const Workspaces = () => {
  const [works, setWorks] = useState(null);
  const [open, setOpen] = useState(false);

  const loadWorks = async () => {
    try {
      const AllWorks = await DataStore.query(AllWorkSpaces);
      AllWorks.length !== 0 && setWorks(AllWorks);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    let isActive = false;

    !isActive && loadWorks();

    return () => (isActive = true);
  }, []);

  const createNewWork = async (val, { setSubmitting }) => {
    try {
      const list = await DataStore.query(AllWorkSpaces);

      if (list.filter((l) => l.name === val.name).length === 0) {
        setSubmitting(true);

        await DataStore.save(
          new AllWorkSpaces({
            hourlyRate: { amount: 1500, currency: "EURO" },
            imageUrl: "http://aliquaauteproidentnonparia.net",
            memberships: [],
            name: val.name,
            workspaceSettings: { shortBreak: 15, dinnerBreak: 15 },
            customOwner: "",
          })
        );

        setSubmitting(false);

        loadWorks();
      } else console.warn("Already on");
    } catch (error) {
      console.warn(error);

      setSubmitting(false);
    }
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right" />
              <TableCell align="right">
                <Button onClick={() => setOpen(!open)}>New</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={4}
                style={{ paddingBottom: 0, paddingTop: 0 }}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Formik
                      initialValues={{
                        name: "",
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        createNewWork(values, { setSubmitting });
                      }}
                    >
                      {({ values, handleSubmit, handleChange, handleBlur }) => (
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                          }}
                          noValidate
                          autoComplete="off"
                          onSubmit={handleSubmit}
                        >
                          <TextField
                            id="name"
                            name="Workspace name"
                            label="Work name"
                            value={values.name}
                            onBlur={handleBlur("name")}
                            onChange={handleChange("name")}
                            variant="standard"
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                          >
                            Save
                          </Button>
                        </Box>
                      )}
                    </Formik>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {works !== null &&
              works.map((row) => (
                <Row data={row} key={row.name} reload={loadWorks} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Workspaces;
