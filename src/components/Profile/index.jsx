import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useAppContext } from "../../services/contextLib";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [loadedUser, setLoadedUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();

      console.log(currentUser);
      setLoadedUser(currentUser);
    };

    if (loadedUser === null) loadUser();
  }, [loadedUser]);

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    navigate("login");
  };

  return (
    <DropdownButton align="end" title="Profile">
        <Dropdown.ItemText>
          {loadedUser != null ? loadedUser.attributes.name : "Loading"}
        </Dropdown.ItemText>
        <Dropdown.ItemText>
          {loadedUser != null ? loadedUser.attributes.email : "Loading"}
        </Dropdown.ItemText>
        <Dropdown.Divider />
        <LinkContainer to="/settings">
          <Dropdown.Item>Profile settings</Dropdown.Item>
        </LinkContainer>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    </DropdownButton>
  );
};

export default Profile;
