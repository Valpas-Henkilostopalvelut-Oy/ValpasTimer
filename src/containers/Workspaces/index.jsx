import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import { List, ListItem, Button } from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import "./Workspaces.css";
import "../../App.css";
import { LinkContainer } from "react-router-bootstrap";

import { useAppContext } from "../../services/contextLib";

const Workspaces = () => {
  const [works, setWorks] = useState([]);
  const { selectedOption } = useAppContext();

  const loadWorks = async () => {
    const AllWorks = await DataStore.query(AllWorkSpaces);
    if (AllWorks.length !== 0) {
      setWorks(AllWorks);
    }
  };

  useEffect(() => {
    loadWorks();
  }, []);

  const deleteItem = async (id) => {
    try {
      const itemToDelete = await DataStore.query(AllWorkSpaces, id);
      await DataStore.delete(itemToDelete);
      alert("Deleted");
      loadWorks();
    } catch (error) {
      console.log(error);
    }
  };

  const createWorkspace = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <Button
        onClick={async () => {
          console.log(selectedOption);
        }}
      >
        log
      </Button>
      <div className="heading">Workspaces</div>
      <List>
        {works.map((val, key) => {
          return (
            <ListItem key={key} className="itemInList">
              <div>{val.name}</div>
              <div className="itemInListLeft">
                <LinkContainer to="/workspaces/settings">
                  <div>Settings</div>
                </LinkContainer>

                <div onClick={() => deleteItem(val.id)}>
                  <CloseIcon />
                </div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Workspaces;
