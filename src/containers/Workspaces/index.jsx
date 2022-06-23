import React, { Fragment, useEffect, useState } from "react";
import { API, DataStore, Auth } from "aws-amplify";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import { useAppContext } from "../../services/contextLib";
import * as yup from "yup";
import LoaderButton from "../../components/LoaderButton";
import { ChangeRole } from "./Tools";

const UserList = ({ member, data, index, selected, setSelected }) => {
  const [user, setUser] = useState(null);
  const { groups } = useAppContext();

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
  }, [member, user]);

  return user !== null ? (
    <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
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
      <TableCell>
        <ChangeRole userId={member.userId} workId={data.id} isAdmin={groups.includes("Admins")} />
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell colSpan={3}>Loading...</TableCell>
    </TableRow>
  );
};

const AddUser = ({ open, setOpen, id, reload }) => {
  const { groups } = useAppContext();
  const [message, setMessage] = useState(null);

  //validate email
  const validateEmail = yup.object().shape({
    email: yup
      .string()
      .min(2, "Email is too short")
      .max(50, "Email is too long")
      .email("Invalid email format")
      .required("Email is required"),
  });

  //disable button if email is invalid
  const enable = (values) => {
    return values.email.length > 0;
  };

  //modal for adding users to workspace

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validateEmail}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              if (groups.includes("Admins")) {
                await API.get("AdminQueries", "/listUsers", {
                  queryStringParameters: {
                    filter: "email",
                  },
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
                  },
                })
                  .then(async (data) => {
                    const foundUser = data.Users.find(
                      (u) => u.Attributes.find((a) => a.Name === "email").Value === values.email
                    );

                    if (foundUser !== undefined) {
                      const credentialsId = foundUser.Attributes.find((a) => a.Name === "custom:UserCreditails").Value;
                      const credentials = await DataStore.query(UserCredentials, credentialsId);
                      const original = await DataStore.query(AllWorkSpaces, id);

                      if (groups.includes("Admins") && credentials !== undefined && original !== undefined) {
                        if (
                          original.memberships.filter((m) => m.userId === credentials.userId).length === 0 &&
                          credentials.memberships.filter((m) => m.workspaceId === original.id).length === 0
                        ) {
                          //add user to workspace
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
                          setMessage("User added to workspace");
                          reload();
                          setOpen(false);
                        } else {
                          setMessage("User is already a member of this workspace");
                        }
                      }
                    } else {
                      setMessage("User does not exist");
                    }
                  })
                  .catch((err) => console.warn(err));
              }
            } catch (error) {
              setSubmitting(false);
              console.warn(error);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched }) => (
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
              onSubmit={handleSubmit}
              component="form"
            >
              <Typography variant="h6">Add User</Typography>
              <TextField
                id="email"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setMessage(null)}
                fullWidth
                margin="normal"
                variant="outlined"
                error={touched.email && errors.email}
              />
              {message !== null && (
                <Typography variant="caption" color="error">
                  {message}
                </Typography>
              )}{" "}
              {errors.email && touched.email && (
                <Typography variant="caption" color="error">
                  {errors.email}
                </Typography>
              )}
              <LoaderButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                isLoading={isSubmitting}
                text="Add user"
                loadingText="Adding..."
                disabled={!enable(values)}
              />
            </Box>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

const TableToolBar = ({ selected, data, numSelected, setSelected, reload }) => {
  const [open, setOpen] = useState(false);

  //delete selected users from workspace
  const handleDelete = async () => {
    for (let i = 0; i < selected.length; i++) {
      const original = await DataStore.query(AllWorkSpaces, data.id);
      const users = await DataStore.query(UserCredentials);
      const user = users.find((u) => u.userId === selected[i]);

      if (original !== undefined && user !== undefined) {
        try {
          await DataStore.save(
            AllWorkSpaces.copyOf(original, (updated) => {
              updated.memberships = updated.memberships.filter((m) => m.userId !== user.userId);
            })
          );
        } catch (error) {
          console.warn(error);
        }
        try {
          await DataStore.save(
            UserCredentials.copyOf(user, (updated) => {
              updated.memberships = updated.memberships.filter((m) => m.targetId !== original.id);
            })
          );
        } catch (error) {
          console.warn(error);
        }
      }
    }
    reload();
    setSelected([]);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          User list
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
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
          <AddUser open={open} setOpen={setOpen} data={data} id={data.id} reload={reload} />
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
      <TableRow key={data.name} sx={{ "&:last-child tg, &:last-child th": { border: 0 } }}>
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
              {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
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
                  <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>
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
              reload={reload}
            />

            <TableContainer sx={{ maxHeight: 440, width: "100%", mb: 3 }}>
              <Table aria-label="stivky table">
                <TableHead>
                  <TableRow>
                    <TableCell />

                    <TableCell>Name</TableCell>

                    <TableCell>Email</TableCell>

                    <TableCell>Role</TableCell>
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
            workers: [],
            clientId: [],
            adminId: [],
            managerId: [],
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
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right" />
              <TableCell align="right">
                <Button onClick={() => setOpen(!open)}>New</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
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
                          <Button type="submit" variant="contained" color="primary" size="large">
                            Create
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
            {works !== null && works.map((row) => <Row data={row} key={row.name} reload={loadWorks} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Workspaces;
