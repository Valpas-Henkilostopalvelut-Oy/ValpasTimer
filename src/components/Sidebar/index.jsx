import React from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarDate";
import { List, ListItem } from "@chakra-ui/react";
import { LinkContainer } from "react-router-bootstrap";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <List className="SidebarList">
        {SidebarData.map((val, key) => (
          <LinkContainer to={val.link} key={key}>
            <ListItem
              /*id={window.location.pathname === val.link ? "active" : ""}*/
              className="row-custom"
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </ListItem>
          </LinkContainer>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
