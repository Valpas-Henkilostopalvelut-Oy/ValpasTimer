import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib.jsx";
import { Typography, Container } from "@mui/material";

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
    <iframe
      src="https://www.recright.com/careers/fi/valpas"
      allow="camera;microphone"
      id="recright"
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
};

export default Home;
