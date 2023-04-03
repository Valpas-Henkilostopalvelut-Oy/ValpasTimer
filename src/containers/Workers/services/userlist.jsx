import React, { useState } from "react";
import { Box, Grid, Typography, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Morebutton from "./morebuttons";
import Usergroup from "./changerole";

const Userstatus = (props) => {
  let { UserStatus } = props;
  
  UserStatus === "FORCE_CHANGE_PASSWORD" && (UserStatus = "Salasana vaihdettava");
  UserStatus === "CONFIRMED" && (UserStatus = "Vahvistettu");
  UserStatus === "UNCONFIRMED" && (UserStatus = "Vahvistamaton");
  UserStatus === "ARCHIVED" && (UserStatus = "Arkistoitu");
  UserStatus === "COMPROMISED" && (UserStatus = "Vahingoittunut");
  UserStatus === "UNKNOWN" && (UserStatus = "Tuntematon");
  UserStatus === "RESET_REQUIRED" && (UserStatus = "Salasanan palautus vaaditaan");
  UserStatus === "DISABLED" && (UserStatus = "Poistettu käytöstä");
  
  return (
    <Box>
      <Typography variant="p">{UserStatus}</Typography>
    </Box>
  );
}

const Userlist = (props) => {
  const { users } = props;
  return users && users.map((user) => <User key={user.Username} user={user} {...props} />);
};

const User = (props) => {
  const { user } = props;
  const { Attributes, Enabled,  } = user;
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
            <Userstatus {...user} />
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
  var ignore = ["name", "family_name", "custom:RuningTimeEntry", "custom:UserCreditails", "sub", "picture"];

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
          if (attr.Value === "true") attr.Value = "Kyllä";
          if (attr.Value === "false") attr.Value = "Ei";
          if (attr.Name === "custom:iban") attr.Name = "IBAN";
          if (attr.Name === "custom:id_number") attr.Name = "Henkilötunnus";
          if (attr.Name === "custom:nationality") attr.Name = "Kansalaisuus";
          if (attr.Name === "phone_number") attr.Name = "Puhelinnumero";
          if (attr.Name === "email") attr.Name = "Sähköposti";
          if (attr.Name === "phone_number_verified") attr.Name = "Puhelinnumero varmistettu";
          if (attr.Name === "email_verified") attr.Name = "Sähköposti varmistettu";
          if (attr.Name === "birthdate") {
            attr.Name = "Syntymäaika";
            console.log(attr.Value)
          }

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
