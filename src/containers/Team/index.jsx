import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../models";
import {
  Tabs,
  ListGroup,
  Tab,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import { useAppContext, AppContext } from "../../services/contextLib";
import "./team.css";
import "../../App.css";
import { onError } from "../../services/errorLib";
import PopupAddUser from "./PopupAddUser";

const Team = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [users, setUsers] = useState(null);
  const { selectedOption } = useAppContext();

  useEffect(() => {
    const queue = async () => {
      try {
        const workspace = await DataStore.query(
          AllWorkSpaces,
          selectedOption.id
        );
        setCurrentWorkspace(workspace);
      } catch (error) {
        onError(error);
      }
    };
  }, [selectedOption]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userCredentials = await DataStore.query(UserCredentials);

        let q = [];

        for (let i = 0; i < userCredentials.length; i++) {
          for (let ii = 0; ii < userCredentials[i].memberships.length; ii++) {
            if (
              userCredentials[i].memberships[ii].targetId === selectedOption.id
            ) {
              q.push(userCredentials[i]);
            }
          }
        }

        if (q.length !== 0) {
          setUsers(q);
        } else {
          setUsers(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadUsers();
  }, [selectedOption]);

  return (
    <div className="main">
      <Container fluid={true}>
        <div>
          <div>
            <h1>Team</h1>
          </div>
        </div>
        <Tabs className="mb-3">
          <Tab eventKey="users" title="Members" className="members">
            <Row>
              <Col>
                <Button
                  onClick={async () => {
                    const loggedUser = await Auth.currentAuthenticatedUser();
                    const credentails = await DataStore.query(
                      UserCredentials,
                      loggedUser.attributes["custom:UserCreditails"]
                    );
                    const currentWorkspace = await DataStore.query(
                      AllWorkSpaces,
                      selectedOption.id
                    );

                    console.log(loggedUser);
                    console.log(credentails);
                  }}
                >
                  log
                </Button>
              </Col>
              <Col>Search</Col>
              <AppContext.Provider value={{ selectedOption }}>
                <PopupAddUser />
              </AppContext.Provider>
            </Row>

            <ListGroup>
              <div className="membersText">Members</div>
              <ListGroup.Item className="mx-0">
                <Row>
                  <Col xs={2}>Name</Col>
                  <Col xs={3}>Email</Col>
                  <Col xs={3}>Billable Rate (euro)</Col>
                  <Col xs={2}>Role</Col>
                  <Col xs={2}>Group</Col>
                </Row>
              </ListGroup.Item>
              {users != null &&
                users.map((data, key) => {
                  let q = data.memberships.find(
                    (m) => m.targetId === selectedOption.id
                  );
                  return (
                    <ListGroup.Item key={key}>
                      <Row>
                        <Col xs={2}>
                          {data.profile.first_name} {data.profile.last_name}
                        </Col>
                        <Col xs={3}>{data.profile.email}</Col>
                        <Col xs={3}>
                          {q !== undefined && q.hourlyRate.amount}{" "}
                          {q !== undefined && q.hourlyRate.currency}
                        </Col>
                        <Col xs={2}>Role</Col>
                        <Col xs={2}>Group</Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </Tab>
          <Tab eventKey="groups" title="Groups"></Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Team;
