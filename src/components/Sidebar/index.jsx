import React from "react";
import "../../App.css";
import { SidebarData } from "./SidebarDate";
import { LinkContainer } from "react-router-bootstrap";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="SidebarList">
        {SidebarData.map((val, key) => (
          <LinkContainer to={val.link} key={key}>
            <div
              /*id={window.location.pathname === val.link ? "active" : ""}*/
              className="row-custom"
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </div>
          </LinkContainer>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
