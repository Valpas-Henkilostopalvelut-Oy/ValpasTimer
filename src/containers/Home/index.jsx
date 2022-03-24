import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib";
import "../../App.css";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

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
    <div className="main">
      <Switch {...label} />

      {isAuthenticated ? (
        <div>
          <div>Welcome to Valpas application</div>
          <div>
            Welcome {currentUser.length !== 0 && currentUser.attributes.email}
          </div>
        </div>
      ) : (
        <div>Not Authenticated</div>
      )}
    </div>
  );
};

export default Home;
