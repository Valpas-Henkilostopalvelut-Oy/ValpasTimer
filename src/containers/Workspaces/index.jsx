import React, { Fragment, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../models";
import "./Workspaces.css";
import "../../App.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../../services/contextLib";
import {
  Container,
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik } from "formik";

const Row = ({ data, reload }) => {
  const [open, setOpen] = useState(false);

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

        <TableCell align="right">Active</TableCell>

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
