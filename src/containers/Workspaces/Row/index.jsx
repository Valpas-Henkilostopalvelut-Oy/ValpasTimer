import React, { Fragment, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  IconButton,
  Box,
  Collapse,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik } from "formik";
import { TableToolBar } from "../TableToolBar/index.jsx";
import { UserList } from "../UserList/index.jsx";

export const Row = ({ data, reload }) => {
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
