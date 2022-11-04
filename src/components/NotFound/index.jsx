import React from "react";
import { Container, Box, Typography } from "@mui/material";

const NotFound = () => {
  //404 not found 
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={3}>
        <Typography variant="h4">404</Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <Typography variant="body1">The page you are looking for doesn't exist.</Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
