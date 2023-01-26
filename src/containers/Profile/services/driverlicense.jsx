import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Drivingtype } from "../../../models";
import { PropTypes } from "prop-types";

const OwnCar = ({ ownCar, setOwnCar, lang }) => {
  return (
    <ListItem key="owncar" disablePadding>
      <ListItemButton role={undefined} onClick={() => setOwnCar(!ownCar)} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={ownCar} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText id="owncar" primary={lang.owncar} />
      </ListItemButton>
    </ListItem>
  );
};

export const Driverlicense = ({ checked, setChecked, ownCar = false, setOwnCar, lang }) => {
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
      <OwnCar ownCar={ownCar} setOwnCar={setOwnCar} lang={lang} />
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

Driverlicense.propTypes = {
  checked: PropTypes.array.isRequired,
  setChecked: PropTypes.func.isRequired,
  ownCar: PropTypes.bool,
  setOwnCar: PropTypes.func,
  lang: PropTypes.object.isRequired,
};

OwnCar.propTypes = {
  ownCar: PropTypes.bool.isRequired,
  setOwnCar: PropTypes.func.isRequired,
  lang: PropTypes.object.isRequired,
};
