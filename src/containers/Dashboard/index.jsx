import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./style.css";
import { useAppContext } from "../../services/contextLib";

import { DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../models";

const Dashboard = () => {
  const [usersInWorkspace, setUsers] = useState(null);
  const { selectedOption } = useAppContext();

  useEffect(() => {
    const loadUsers = async () => {
      const timeEntry = await DataStore.query(TimeEntry);
      const users = await DataStore.query(UserCredentials);

      let q = [];
      const timeEntryOfWorkspace = timeEntry.filter(
        (t) => t.workspaceId === selectedOption.id
      );

      for (let i = 0; i < timeEntryOfWorkspace.length; i++) {
        console.log(timeEntryOfWorkspace[i].userId);
        if (true) {
          console.log(user);
        }
      }
    };

    loadUsers();
  }, [selectedOption]);

  return (
    <Container fluid={true}>
      <Row md={1} xs={1}>
        <Col>Dashboard-first</Col>
        <Col>
          <ListGroup>
            <ListGroup.Item>Team activities</ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Team member</Col>
                <Col>Latest activity</Col>
                <Col>Total tracked</Col>
              </Row>
            </ListGroup.Item>
            {usersInWorkspace !== null && <ListGroup.Item>ddd</ListGroup.Item>}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
