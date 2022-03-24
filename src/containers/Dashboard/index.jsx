import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./style.css";
import { useAppContext, AppContext } from "../../services/contextLib";
import TotalLatest from "./TotalTracked";

import { DataStore } from "aws-amplify";
import { UserCredentials } from "../../models";

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const { selectedOption } = useAppContext();

  useEffect(() => {
    const loadTeamActivities = async () => {
      const usersCredentials = await DataStore.query(UserCredentials);

      let q = [];

      for (let i = 0; i < usersCredentials.length; i++) {
        if (
          usersCredentials[i].memberships.filter(
            (m) => m.targetId === selectedOption.id
          ).length > 0
        ) {
          q.push(usersCredentials[i]);
        }
      }

      setUsers(q);
    };

    loadTeamActivities();
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
                <Col>Total tracked (This week)</Col>
              </Row>
            </ListGroup.Item>
            {users !== null &&
              users.map((data, key) => (
                <TotalLatest data={data} selOption={selectedOption} key={key}/>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
