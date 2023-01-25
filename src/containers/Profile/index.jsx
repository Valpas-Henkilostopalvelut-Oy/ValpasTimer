import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Divider, Tab, CircularProgress } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Auth, DataStore, Hub } from "aws-amplify";
import { UserCredentials } from "../../models";
import { Details } from "./services/details.jsx";
import { Cards } from "./services/cards.jsx";
import { useAppContext } from "../../services/contextLib";

export const Profile = () => {
  const [value, setValue] = useState("1");
  const [isEmpty, setEmpty] = useState(true);
  const [user, setUser] = useState({
    cognito: null,
    datastore: null,
    workcards: null,
  });
  const { langValue } = useAppContext();
  const profilelang = langValue.profile;

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
                workcards: data.workcards,
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
  }, [isEmpty]);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
        setEmpty(data.isEmpty);
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //line under Profile text
  return (
    <Container>
      {user.cognito && user.datastore ? (
        <>
          <Box>
            <Typography
              variant="h4"
              color="text.secondary"
              sx={{
                marginBottom: "20px",
                marginTop: "40px",
              }}
            >
              {profilelang.title}
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
              width: "100%",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList onChange={handleChange} aria-label="Profile tabs">
                  <Tab label={profilelang.details.details} value="1" />
                  <Tab label={profilelang.cards.cards} value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Details cognito={user.cognito} data={user.datastore} lang={profilelang.details} />
              </TabPanel>
              <TabPanel value="3">
                <Cards
                  data={user.datastore}
                  workcards={user.workcards}
                  id={user.cognito["custom:UserCreditails"]}
                  isEmpty={isEmpty}
                  lang={profilelang.cards}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
