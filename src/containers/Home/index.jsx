import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib.jsx";
import { Typography, Box, Container } from "@mui/material";

const Home = () => {
  const { isAuthenticated } = useAppContext();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
    };
    isAuthenticated && loadUser();
  }, [isAuthenticated]);

  return (
    <Container>
      {currentUser ? (
        <Typography>Welcome {currentUser.attributes.email}</Typography>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default Home;
