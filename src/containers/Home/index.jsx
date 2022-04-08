import { Auth, API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib";
import "../../App.css";
import { Button, Typography, Box } from "@mui/material";

let nextToken;

async function listAdmins(limit) {
  let apiName = "AdminQueries";
  let path = "/listUsersInGroup";
  let myInit = {
    queryStringParameters: {
      groupname: "Admins",
      limit: limit,
      token: nextToken,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  console.log(await API.get(apiName, path, myInit));
}

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
      <Button onClick={() => listAdmins(10)}>log</Button>
    </Box>
  );
};

export default Home;
