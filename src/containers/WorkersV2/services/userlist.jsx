import React, { useState } from "react";
import { Box, Grid, Typography, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Morebutton from "./morebuttons";
import Usergroup from "./changerole";

const Userlist = (props) => {
  const { users } = props;
  return users && users.map((user) => <User key={user.Username} user={user} {...props} />);
};

const User = (props) => {
  const { user } = props;
  const { Attributes, Enabled, UserStatus } = user;
  const [open, setOpen] = useState(false);
  const nameAttr = Attributes.find((attr) => attr.Name === "name");
  const name = nameAttr?.Value;

  const emailAttr = Attributes.find((attr) => attr.Name === "email");
  const email = emailAttr?.Value;

  return (
    <Grid item xs={12}>
      <Box sx={{ border: "3px solid", borderColor: "default.orange", padding: "20px 40px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item sm={1} xs={12}>
            <IconButton onClick={() => setOpen(!open)} sx={{ cursor: "pointer" }} aria-label="expand row" size="mdall">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="p">{name}</Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography variant="p">{email}</Typography>
          </Grid>

          <Grid item sm={2}>
            <Typography variant="p">{Enabled ? "Käytössä" : "Ei käytössä"}</Typography>
          </Grid>

          <Grid item sm={2}>
            <Typography variant="p">{UserStatus}</Typography>
          </Grid>

          <Grid item sm={1} xs={12}>
            <Morebutton user={user} enabled={Enabled} {...props} />
          </Grid>
        </Grid>

        <Moreinfo attributes={Attributes} open={open} user={user} {...props} />
      </Box>
    </Grid>
  );
};

const Moreinfo = (props) => {
  const { attributes, open, user } = props;
  const { UserCreateDate } = user;
  var ignore = [
    "name",
    "family_name",
    "custom:RuningTimeEntry",
    "email",
    "custom:UserCreditails",
    "sub",
    "custom:role",
    "custom:workplaceid",
    "custom:roleid",
    "custom:userid",
    "picture",
  ];

  const createdAt = new Date(UserCreateDate).toLocaleDateString("fi-FI");
  return (
    <Collapse in={open}>
      <Box marginTop={2}>
        <Typography variant="p" sx={{ fontWeight: "bold" }}>
          Lisätiedot Cognito
        </Typography>

        <Usergroup Username={user.Username} {...props} />

        <Box sx={{ border: "1px solid", borderColor: "#e6e6ef", mt: 2 }}>
          <Grid container>
            <Grid item sm={1} xs={12} />
            <Grid item sm={5} xs={12}>
              <Typography variant="p">Luotu</Typography>
            </Grid>
            <Grid item sm={5} xs={12}>
              <Typography variant="p">{createdAt}</Typography>
            </Grid>
            <Grid item sm={1} xs={12} />
          </Grid>
        </Box>
        {attributes.map((attr, i) => {
          if (ignore.includes(attr.Name)) return null;
          return (
            <Box sx={{ border: "1px solid", borderColor: "#e6e6ef" }} key={attr.Name}>
              <Grid container>
                <Grid item sm={1} xs={12} />
                <Grid item sm={5} xs={12}>
                  <Typography variant="p">{attr.Name}</Typography>
                </Grid>
                <Grid item sm={5} xs={12}>
                  <Typography variant="p">{attr.Value}</Typography>
                </Grid>
                <Grid item sm={1} xs={12} />
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Collapse>
  );
};

const Moredata = ({ user }) => {};

export default Userlist;
