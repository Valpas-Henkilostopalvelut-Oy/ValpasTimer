import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
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
} from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import LoaderButton from "../../../components/LoaderButton";
import { Agreement } from "../../../models";

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
                  <TextField
                    fullWidth
                    id="agreement"
                    name="agreement"
                    label="Agreement"
                    autoComplete="agreement"
                    value={values.agreement}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <LoaderButton
                    sx={{ mt: 2 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!values.agreement}
                    isLoading={isSubmitting}
                    text="Add"
                    loadingText="Adding…"
                  />
                </Box>
              </Box>
            </Container>
          )}
        </Formik>
      </Popover>
    </Toolbar>
  );
};

const AditionalInfo = ({ item, reload }) => {
  const [description, setDescription] = useState(item.description);
  const [name, setName] = useState(item.name);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ flex: "1 1 100%" }}>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Formik
              initialValues={{ name: name }}
              onSubmit={(val, { setSubmitting }) => {
                console.log(val);
                setTimeout(() => {
                  setSubmitting(false);
                }, 1000);
              }}
            >
              {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="New name"
                        autoComplete="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <LoaderButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!values.name}
                        isLoading={isSubmitting}
                        text="Save"
                        loadingText="Saving…"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Grid>
          <Grid item xs={2}>
            Edit description
          </Grid>
          <Grid item xs={2}>
            Delete
          </Grid>
          <Grid item xs={12}>
            <Typography>{description}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const renameAgreement = async ({ values, reload, id, setSubmitting }) => {
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
  const count = (await DataStore.query(Agreement, id)).aditionalInfo.length;

  console.log(count);

  await DataStore.query(Agreement, id)
    .then(async (agreement) => {
      await DataStore.save(
        Agreement.copyOf(agreement, (updated) => {
          updated.aditionalInfo.push({
            name: values.newAditionalInfo,
            description: "",
            id: count + 1,
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

export const AgreementAdminPanel = () => {
  const [agreement, setAgreements] = useState([]);

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
          <Accordion key={k}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${agreement.name}-content`}
              id={`${agreement.name}-header`}
            >
              <Typography variant="h6">{agreement.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography>Admin Panel for {agreement.name}</Typography>
                  <Typography>Created at: {new Date(agreement.createdAt).toDateString()}</Typography>
                  <Typography>
                    Created by: {agreement.user.name} {agreement.user.family_name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Formik
                    initialValues={{
                      name: agreement.name,
                    }}
                    onSubmit={(val, { setSubmitting }) =>
                      renameAgreement({ values: val, reload: loadData, id: agreement.id, setSubmitting: setSubmitting })
                    }
                  >
                    {({ values, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                      <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={9}>
                            <TextField
                              fullWidth
                              id="name"
                              name="name"
                              label="Edit name"
                              autoComplete="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <LoaderButton
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={!values.name}
                              isLoading={isSubmitting}
                              text="Update"
                              loadingText="Updating…"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Formik>
                </Grid>
                <Grid item xs={6}>
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
                            <LoaderButton
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={!values.newAditionalInfo}
                              isLoading={isSubmitting}
                              text="Add"
                              loadingText="Adding…"
                            />
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
                    <AditionalInfo key={k} item={aditionalInfo} />
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
    </Container>
  );
};
