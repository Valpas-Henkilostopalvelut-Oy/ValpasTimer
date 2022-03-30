import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib";
import "../../App.css";
import { Switch, Container } from "@mui/material";

const Home = () => {
  const { isAuthenticated } = useAppContext();
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const user = await Auth.currentUserInfo();
      setCurrentUser(user);
    };
    isAuthenticated && loadUser();
  }, []);

  return (
    <Container>
      <div>
        <div>Welcome to Valpas application</div>
        <div>
          Welcome {currentUser.length !== 0 && currentUser.attributes.email}
        </div>
      </div>
    </Container>
  );
};

export default Home;
