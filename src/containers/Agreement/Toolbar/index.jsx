import React, { Fragment, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Popover,
  Box,
  Container,
  TextField,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Formik } from "formik";
import LoaderButton from "../../../components/LoaderButton";
import { DataStore, Auth } from "aws-amplify";
import { Agreement, Status } from "../../../models";

const AddButton = ({ reload }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    reload();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "agreement-popover" : undefined;

  return (
    <Fragment>
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
        <Formik
          initialValues={{ agreement: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            let time = new Date().toISOString();
            await Auth.currentAuthenticatedUser()
              .then(async (user) => {
                await DataStore.save(
                  new Agreement({
                    title: values.agreement,
                    description: values.agreement,
                    createdAt: time,
                    user: {
                      userId: user.username,
                      name: user.attributes.name,
                      family_name: user.attributes.family_name,
                      icon: user.attributes.picture,
                    },
                    subInfo: [],
                  })
                ).catch((error) => console.warn(error));
                handleClose();
              })
              .catch((error) => console.warn(error));
          }}
        >
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
    </Fragment>
  );
};

export const AgreementToolbar = ({ reload }) => {
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
        Perehdykset
      </Typography>

      <AddButton reload={reload} />
    </Toolbar>
  );
};
