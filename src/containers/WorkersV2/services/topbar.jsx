import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import CreateUser from "./createuser";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [reload, setReload] = useState(false);

  const close = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ border: "3px solid", borderColor: "default.orange", padding: "20px 40px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={10} />

        <Grid item xs={6} sm={2}>
          <CreateUser
            open={open}
            close={close}
            reload={reload}
            setReload={setReload}
            setPassword={setPassword}
            password={password}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopBar;
