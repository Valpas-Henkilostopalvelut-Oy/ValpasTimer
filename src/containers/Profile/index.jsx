import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Divider, Tabs, Tab, useTheme } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { UserCredentials } from "../../models";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pl: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const Profile = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState({
    cognito: null,
    datastore: null,
  });
  const theme = useTheme();

  useEffect(() => {
    let isMounted = true;
    const loaduser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(async (user) => {
          await DataStore.query(UserCredentials, user.attributes["custom:UserCreditails"])
            .then((data) => {
              setUser({
                cognito: user.attributes,
                datastore: data,
              });
            })
            .catch((err) => {
              console.warn(err);
            });
        })
        .catch((err) => {
          console.warn(err);
        });
    };
    isMounted && loaduser();
    return () => (isMounted = false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //line under Profile text
  return (
    <Container>
      <Box>
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{
            marginBottom: "20px",
            marginTop: "40px",
          }}
        >
          Profile
        </Typography>
        <Divider
          sx={{
            marginBottom: "20px",
            opacity: "0.3",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Tabs
          orientation={"vertical"}
          value={value}
          onChange={handleChange}
          aria-label="Profile Tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Settings" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography>dd</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </Container>
  );
};
