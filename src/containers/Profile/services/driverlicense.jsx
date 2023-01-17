import React, { useState } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, IconButton, ListItemText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Drivingtype, Cardtype, Workcardtype } from "../../../models";

const OwnCar = ({ ownCar, setOwnCar }) => {
  return (
    <ListItem key="owncar" disablePadding>
      <ListItemButton role={undefined} onClick={() => setOwnCar(!ownCar)} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={ownCar} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText id="owncar" primary="Own car" />
      </ListItemButton>
    </ListItem>
  );
};

export const Driverlicense = ({ data, checked, setChecked, ownCar, setOwnCar }) => {
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  /*array is [[{A: "A"}, {A1: "A1"}, ...],[{...}, ...] ,[{...}, ...], [{...}, ...] ]*/

  return (
    <List>
      <OwnCar ownCar={ownCar} setOwnCar={setOwnCar} />
      {Object.keys(Drivingtype).map((type) => {
        const labelId = `checkbox-list-label-${type}`;
        return (
          <ListItem key={type} disablePadding>
            <ListItemButton role={undefined} onClick={() => handleToggle(type)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(type) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={type} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
