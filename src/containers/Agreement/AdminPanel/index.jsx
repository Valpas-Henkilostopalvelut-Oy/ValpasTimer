import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Popover,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import LoaderButton from "../../../components/LoaderButton/index.jsx";
import { Agreement, AllWorkSpaces } from "../../../models/index.js";
import { UserTable } from "./UserTable/index.jsx";
import { PropTypes } from "prop-types";

const AdminToolbar = ({ reload }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    reload();
    setAnchorEl(null);
  };

  const createAgreement = async (values, { setSubmitting }) => {
    setSubmitting(true);
    let time = new Date().toISOString();
    await Auth.currentAuthenticatedUser()
      .then(async (user) => {
        await DataStore.save(
          new Agreement({
            clients: [],
            workers: [],
            createdAt: time,
            user: {
              userId: user.username,
              name: user.attributes.name,
              family_name: user.attributes.family_name,
              icon: user.attributes.picture,
            },
            name: values.agreement,
            aditionalInfo: [],
            userAgreement: [],
            workspaceId: [],
          })
        ).catch((error) => console.warn(error));
        handleClose();
      })
      .catch((error) => console.warn(error));
  };

  const open = Boolean(anchorEl);
  const id = open ? "agreement-popover" : undefined;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: "default.white",
        borderRadius: "4px 4px 0 0",
      }}
      component={Paper}
    >
      <Typography color="inherit" variant="subtitle1" component="div" sx={{ flex: "1 1 100%" }}>
        Admin panel
      </Typography>

      <Tooltip title="Add">
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
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
        <Formik initialValues={{ agreement: "" }} onSubmit={createAgreement}>
          {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 4,
                  mb: 4,
                }}
              >
                <Typography component="h1" variant="h5">
                  Add Agreement
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: 350 }}>
                  <TextField fullWidth id="agreement" name="agreement" label="Agreement" autoComplete="agreement" value={values.agreement} onChange={handleChange} onBlur={handleBlur} />
                  <LoaderButton sx={{ mt: 2 }} type="submit" fullWidth variant="contained" color="primary" disabled={!values.agreement} isLoading={isSubmitting} text="Add" loadingText="Adding…" />
                </Box>
              </Box>
            </Container>
          )}
        </Formik>
      </Popover>
    </Toolbar>
  );
};

const renameAditionalInfo = async ({ id, val, item, setSubmitting, setName }) => {
  await DataStore.query(Agreement, id)
    .then((agreement) => {
      DataStore.save(
        Agreement.copyOf(agreement, (updated) => {
          updated.aditionalInfo = updated.aditionalInfo.map((info) => {
            if (info.id === item.id) {
              info.name = val.name;
            }
            return info;
          });
        })
      ).catch((error) => console.warn(error));
    })
    .catch((error) => console.warn(error));
  setTimeout(() => {
    setName(val.name);
    setSubmitting(false);
  }, 1000);
};

const deelteAditionalInfo = async ({ id, item, setDeleting, reload }) => {
  setDeleting(true);
  await DataStore.query(Agreement, id)
    .then(async (agreement) => {
      await DataStore.save(
        Agreement.copyOf(agreement, (updated) => {
          updated.aditionalInfo = updated.aditionalInfo.filter((info) => info.id !== item.id);
        })
      ).catch((error) => console.warn(error));

      setTimeout(() => {
        setDeleting(false);
        reload();
      }, 1000);
    })
    .catch((error) => console.warn(error));
};

const editAditionalInfoDescription = async ({ values, reload, id, setSubmitting, setDescription, item }) => {
  await DataStore.query(Agreement, id)
    .then(async (agreement) => {
      await DataStore.save(
        Agreement.copyOf(agreement, (updated) => {
          updated.aditionalInfo = updated.aditionalInfo.map((info) => {
            if (info.id === item.id) {
              info.description = values.description;
            }
            return info;
          });
        })
      ).catch((error) => console.warn(error));
      setTimeout(() => {
        setDescription(values.description);
        setSubmitting(false);
        reload();
      }, 1000);
    })
    .catch((error) => console.warn(error));
};

const AditionalInfo = ({ id, item, reload, handleOpen, expanded }) => {
  const [isDeleting, setDeleting] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [description, setDescription] = useState(item.description);
  const [name, setName] = useState(item.name);

  return (
    <Accordion expanded={expanded === item.id} onChange={handleOpen(item.id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ flex: "1 1 100%" }}>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Formik
              initialValues={{ name: name }}
              onSubmit={(val, { setSubmitting }) => {
                renameAditionalInfo({ id, val, item, setSubmitting, setName });
              }}
            >
              {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                      <TextField fullWidth id="name" name="name" label="New name" autoComplete="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    </Grid>
                    <Grid item xs={3}>
                      <LoaderButton type="submit" fullWidth variant="contained" color="primary" disabled={!values.name} isLoading={isSubmitting} text="Save" loadingText="Saving…" />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Grid>
          <Grid item xs={2}>
            <LoaderButton fullWidth variant="contained" color="primary" text="Edit desc" onClick={() => setEditing(!isEditing)} />
          </Grid>
          <Grid item xs={2}>
            <LoaderButton
              fullWidth
              variant="contained"
              color="primary"
              isLoading={isDeleting}
              text="Delete"
              loadingText="Deleting…"
              onClick={() => deelteAditionalInfo({ id, item, setDeleting, isDeleting, reload })}
            />
          </Grid>
          <Grid item xs={12}>
            {!isEditing ? (
              <Typography>{description}</Typography>
            ) : (
              <Formik
                initialValues={{ description: description }}
                onSubmit={(values, { setSubmitting }) => {
                  editAditionalInfoDescription({ values, reload, id, setSubmitting, setDescription, item });
                }}
              >
                {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField fullWidth id="description" name="description" label="Description" autoComplete="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                    <LoaderButton type="submit" fullWidth variant="contained" color="primary" disabled={!values.description} isLoading={isSubmitting} text="Save" loadingText="Saving…" />
                  </Box>
                )}
              </Formik>
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const renameAgreement = async ({ values, reload, id }) => {
  await DataStore.query(Agreement, id)
    .then(async (agreement) => {
      await DataStore.save(
        Agreement.copyOf(agreement, (updated) => {
          updated.name = values.name;
        })
      ).catch((error) => console.warn(error));
      setTimeout(() => {
        reload();
      }, 1000);
    })
    .catch((error) => console.warn(error));
};

const addAditionalInfo = async ({ values, reload, id, setSubmitting }) => {
  const count = Math.floor(Math.random() * 100000) + 1;

  await DataStore.query(Agreement, id)
    .then(async (agreement) => {
      await DataStore.save(
        Agreement.copyOf(agreement, (updated) => {
          updated.aditionalInfo.push({
            name: values.newAditionalInfo,
            description: "",
            id: count,
          });
        })
      ).catch((error) => console.warn(error));
      setTimeout(() => {
        setSubmitting(false);
        reload();
      }, 1000);
    })
    .catch((error) => console.warn(error));
};

// eslint-disable-next-line no-unused-vars
const SelectWorkspaces = ({ id, agreement }) => {
  const [selectedWorkspaces, setSelectedWorkspaces] = useState(agreement.workspaceId);
  const [avalibleWorkspaces, setAvalibleWorkspaces] = useState([]);

  useEffect(() => {
    let isActive = false;

    const loadWorkspaces = async () => {
      await DataStore.query(AllWorkSpaces)
        .then((workspaces) => {
          let q = [];

          for (let i = 0; i < workspaces.length; i++) {
            q.push(workspaces[i].id);
          }

          setAvalibleWorkspaces(q);
        })
        .catch((error) => console.warn(error));
    };

    !isActive && loadWorkspaces();

    return () => (isActive = true);
  }, [agreement.workspaceId]);

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;

    if (selectedWorkspaces.length > value.length) {
      console.log("old", selectedWorkspaces);
      console.log("new", value);
    } else if (selectedWorkspaces.length < value.length) {
      let q = [];

      for (let i = 0; i < value.length; i++) {
        q.push(value[i].id);
      }

      await DataStore.query(Agreement, id)
        .then((agreement) => {
          DataStore.save(
            Agreement.copyOf(agreement, (updated) => {
              updated.workspaceId = q;
            })
          ).catch((error) => console.warn(error));
        })
        .catch((error) => console.warn(error));
    }

    setSelectedWorkspaces(value);
  };

  return (
    <FormControl sx={{ minWidth: 300 }}>
      <InputLabel id="workspace-select-label">Workspaces</InputLabel>
      <Select
        labelId="workspace-select-label"
        id="workspace-select"
        multiple
        value={selectedWorkspaces}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Works" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => {
              return <Chip key={value} label={value} />;
            })}
          </Box>
        )}
      >
        {avalibleWorkspaces.map((workspace) => (
          <MenuItem key={workspace} value={workspace}>
            <ListItemText primary={workspace} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const DeleteAgreement = ({ id, reload }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteAgg = async () => {
    setIsDeleting(true);
    await DataStore.query(Agreement, id).then((item) => {
      DataStore.delete(item).catch((error) => console.warn(error));
      setIsDeleting(false);
      reload();
    });
  };

  return <LoaderButton variant="contained" color="primary" text="Delete" loadingText={"Deleting..."} isLoading={isDeleting} onClick={deleteAgg} />;
};

export const AgreementAdminPanel = () => {
  const [agreement, setAgreements] = useState([]);
  const [agreementExpanded, setAgreementExpanded] = useState(false);
  const [aditionalInfoExpanded, setAditionalInfoExpanded] = useState(false);

  const handleChangeAditionalInfo = (panel) => (event, expanded) => {
    setAditionalInfoExpanded(expanded ? panel : false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setAgreementExpanded(isExpanded ? panel : false);
  };

  const loadData = async () => {
    await DataStore.query(Agreement)
      .then((data) => {
        setAgreements(data);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    let isActive = false;

    !isActive && loadData();

    return () => (isActive = true);
  }, []);

  return (
    <Container>
      <AdminToolbar reload={loadData} />
      {agreement.length > 0 &&
        agreement.map((agreement, k) => (
          <Accordion key={k} expanded={agreementExpanded === agreement.id} onChange={handleChange(agreement.id)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${agreement.name}-content`} id={`${agreement.name}-header`}>
              <Typography variant="h6">{agreement.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography>Admin Panel for {agreement.name}</Typography>
                  <Typography>Created at: {new Date(agreement.createdAt).toDateString()}</Typography>
                  <Typography>
                    Created by: {agreement.user.name} {agreement.user.family_name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <DeleteAgreement id={agreement.id} reload={loadData} />
                </Grid>
                <Grid item xs={12}>
                  <UserTable data={agreement} id={agreement.id} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Formik
                    initialValues={{
                      name: agreement.name,
                    }}
                    onSubmit={(val, { setSubmitting }) => renameAgreement({ values: val, reload: loadData, id: agreement.id, setSubmitting: setSubmitting })}
                  >
                    {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                      <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={9}>
                            <TextField fullWidth id="name" name="name" label="Edit name" autoComplete="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                          </Grid>
                          <Grid item xs={3}>
                            <LoaderButton type="submit" fullWidth variant="contained" color="primary" disabled={!values.name} isLoading={isSubmitting} text="Update" loadingText="Updating…" />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Formik>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Formik
                    initialValues={{ newAditionalInfo: "" }}
                    onSubmit={(val, { setSubmitting }) => {
                      addAditionalInfo({
                        values: val,
                        reload: loadData,
                        id: agreement.id,
                        setSubmitting: setSubmitting,
                      });
                    }}
                  >
                    {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                      <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={9}>
                            <TextField
                              fullWidth
                              id="newAditionalInfo"
                              name="newAditionalInfo"
                              label="Add aditional info"
                              autoComplete="newAditionalInfo"
                              value={values.newAditionalInfo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <LoaderButton type="submit" fullWidth variant="contained" color="primary" disabled={!values.newAditionalInfo} isLoading={isSubmitting} text="Add" loadingText="Adding…" />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Formik>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ pb: 2, pl: 1 }} variant="h6">
                    Aditional info
                  </Typography>
                  {agreement.aditionalInfo.map((aditionalInfo, k) => (
                    <AditionalInfo key={k} id={agreement.id} item={aditionalInfo} reload={loadData} expanded={aditionalInfoExpanded} handleOpen={handleChangeAditionalInfo} />
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
    </Container>
  );
};

AdminToolbar.propTypes = {
  reload: PropTypes.func,
};

DeleteAgreement.propTypes = {
  id: PropTypes.string,
  reload: PropTypes.func,
};

AditionalInfo.propTypes = {
  id: PropTypes.string,
  item: PropTypes.object,
  reload: PropTypes.func,
  expanded: PropTypes.bool,
  handleOpen: PropTypes.func,
};
