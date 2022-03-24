import React from "react";
import { TextField, Box, Grid, Button } from "@mui/material";
import { Formik } from "formik";

const AddTime = () => {
  const [value, setValue] = React.useState(null);

  return (
    <Box
      component="form"
      sx={{
        maxWidth: "100%",
        marginBottom: "20px",
        marginTop: "20px",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TextField placeholder="Description" fullWidth variant="standard" />
        </Grid>

        <Grid item md={6}>
          <Grid container spacing={2}>
            <Grid item maxWidth="100px">
              <TextField placeholder="Start" variant="standard"/>
            </Grid>

            <Grid item maxWidth="100px">
              <TextField placeholder="End" variant="standard" />
            </Grid>

            <Grid item maxWidth="100px">
              <TextField placeholder="Date" variant="standard" />
            </Grid>

            <Grid item>
              <TextField placeholder="Time" variant="standard" />
            </Grid>

            <Grid item>
              <Button variant="contained">Add</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTime;
