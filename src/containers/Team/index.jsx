import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../models";
import { Tabs, ListGroup, Tab, Row, Col, Container } from "react-bootstrap";
import { useAppContext, AppContext } from "../../services/contextLib";
import "./team.css";
import "../../App.css";
import { onError } from "../../services/errorLib";
import PopupAddUser from "./PopupAddUser";

const Team = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const { selectedOption } = useAppContext();

  useEffect(() => {
    const queue = async () => {
      try {
        const workspace = await DataStore.query(
          AllWorkSpaces,
          selectedOption.id
        );
        setCurrentWorkspace(workspace);
        console.log(workspace.memberships);
      } catch (error) {
        onError(error);
      }
    };
    queue();
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
              {currentWorkspace != null &&
                currentWorkspace.memberships.length != 0 &&
                currentWorkspace.memberships.map((data, key) => {
                  return (
                    <ListGroup.Item key={key} className="mb-3">
                      <Row>
                        <Col xs={2}>
                          {data.profile.first_name} {data.profile.last_name}
                        </Col>
                        <Col xs={3}>{data.profile.email}</Col>
                        <Col xs={3}>Billable rate</Col>
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
