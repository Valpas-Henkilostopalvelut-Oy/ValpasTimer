import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./style.css";
import { useAppContext } from "../../services/contextLib";

import { DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../models";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const { selectedOption } = useAppContext();

  useEffect(() => {
    const loadTeamActivities = async () => {
      const timeEntry = await DataStore.query(TimeEntry);
      const usersCredentials = await DataStore.query(UserCredentials);

      let q = [];

      for (let i = 0; i < usersCredentials.length; i++) {
        if (
          usersCredentials[i].memberships.filter(
            (m) => m.targetId === selectedOption.id
          ).length > 0
        ) {
          q.push({
            id: usersCredentials[i].owner,
            profile: usersCredentials[i].profile,
            times: [],
          });
        }
      }

      for (let i = 0; i < q.length; i++) {
        q[i].times = timeEntry.filter(u => u.owner === q[i].id)
          .filter((t) => t.workspaceId === selectedOption.id)


      }
      setData(q);
      console.log(q);

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
                <Col>Total tracked</Col>
              </Row>
            </ListGroup.Item>
            {data !== null && <ListGroup.Item>ddd</ListGroup.Item>}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
