import React from "react";
import { Container, Box, Typography } from "@mui/material";

const NoAccessPage = () => {
  //403 access forbidden and go to home page
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={3}>
        <Typography variant="h4">403</Typography>
        <Typography variant="h5">Access Forbidden</Typography>
        <Typography variant="body1">You dont have permission to access this page.</Typography>
      </Box>
    </Container>
  );
};

export default NoAccessPage;
