import { Auth, API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib";
import "../../App.css";
import { Button, Typography, Box } from "@mui/material";

const Home = () => {
  const { isAuthenticated, admin, editor, applicant } = useAppContext();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await Auth.currentUserInfo();
      setCurrentUser(user);
    };
    isAuthenticated && loadUser();
  }, [isAuthenticated]);

  return (
    <Box>
      {currentUser !== null ? (
        <Typography>Welcome {currentUser.attributes.email}</Typography>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default Home;
