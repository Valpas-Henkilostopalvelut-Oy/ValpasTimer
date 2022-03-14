import React, { useEffect, useState } from "react";
import { DataStore, Auth } from "aws-amplify";
import { UserCredentials } from "../../models";
import { Tabs, ListGroup, Tab } from "react-bootstrap";
import "./team.css";
import "../../App.css"

const Team = () => {
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const queue = async () => {
      try {
        const users = await DataStore.query(UserCredentials);
        setUserList(users);
      } catch (error) {
        console.log(error);
      }
    };
    queue();
  }, []);

  return (
    <div className="main">
        <div>
            <div>
                <h1>Team</h1>
            </div>
        </div>
      <Tabs className="mb-3">
        <Tab eventKey="users" title="Members" className="members">
            <div className="managmentContainer">
                <div>Search</div>
                <div>add user function</div>
            </div>
          <div className="membersText">Members</div>
          <div className="memberInfo">
            <div id="name">Name</div>
            <div id="email">Email</div>
            <div id="rate">Billable Rate (euro)</div>
            <div id="role">Role</div>
            <div id="group">Group</div>
          </div>

          <ListGroup>
            {userList != null &&
              userList.map((data, key) => {
                return (
                  <ListGroup.Item key={key} className="teamItem">
                    <div id="name">{data.name}</div>
                    <div id="email">{data.email}</div>
                    <div id="rate">Billable</div>
                    <div id="role">Role</div>
                    <div id="group">Group</div>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Tab>
        <Tab eventKey="groups" title="Groups"></Tab>
      </Tabs>
    </div>
  );
};

export default Team;
