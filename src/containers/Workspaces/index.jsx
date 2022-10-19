import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../models";
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
  Box,
  Collapse,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { Row } from "./Row/index";

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
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
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
