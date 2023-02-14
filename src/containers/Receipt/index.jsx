import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Button, Collapse, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Hub, DataStore, Auth } from "aws-amplify";
import { Receiptform } from "./services/receiptform.jsx";
import { Moreadd } from "./services/moremenu.jsx";
import { Travelform } from "./services/travelform.jsx";
import { Receiptlang as lang } from "./services/lang.jsx";
import { useAppContext } from "../../services/contextLib.jsx";
import { UserCredentials } from "../../models/index.js";

import { Receiptlist } from "./services/receiptlist.jsx";
import { Travellist } from "./services/travellist.jsx";

/*
{
    "id": "ac331008-41ce-4dee-b96c-8a221a884eda",
    "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
    "activeTimeEntry": null,
    "status": "ACTIVE",
    "defaultWorkspace": "f428aeef-5588-4513-bd5b-13126a45541e",
    "formChecked": [],
    "createdAt": "2022-10-28T09:16:02.617Z",
    "updatedAt": "2023-01-27T12:53:19.368Z",
    "memberships": [
        {
            "membershipStatus": "",
            "membershipType": "WORKSPACE",
            "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
            "targetId": "f428aeef-5588-4513-bd5b-13126a45541e",
            "hourlyRate": {
                "amount": 1500,
                "currency": "EURO"
            },
            "costRate": {
                "amount": null,
                "currency": null
            }
        }
    ],
    "profile": {
        "iban": null,
        "id_number": "12122001-234Y",
        "profile_picture": "http://undefined.name",
        "first_name": "Oleksii",
        "last_name": "Kovbel",
        "email": "alexey.kovbel@gmail.com",
        "email_verified": null,
        "phone_number": "+358401990469",
        "birthdate": null,
        "locale": null,
        "nationality": null
    },
    "settings": {
        "timeFormat": "",
        "timeZone": "",
        "dateFormat": "",
        "modalSendConfirm": true,
        "modalConfirmConfirm": true
    },
    "workcards": [],
    "ownCars": null,
    "_version": 370,
    "_lastChangedAt": 1674823999408,
    "_deleted": null
}
*/

const ReceiptTabs = ({ isEmpty, lang }) => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Receipt and travel tabs" variant="fullWidth">
            <Tab label="Kuitti" value="1" />
            <Tab label="Matkalasku" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{p: "30px 0px"}}>
          <Receiptlist isEmpty={isEmpty} lang={lang} />
        </TabPanel>
        <TabPanel value="2" sx={{p: "30px 0px"}}>
          <Travellist isEmpty={isEmpty} lang={lang} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export const Receipt = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const lang = useAppContext().langValue.receipts;
  const [workers, setWorkers] = useState(null);
  const [currentWorker, setCurrentWorker] = useState(null);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
        setIsEmpty(data.isEmpty);
      }
    });
  }, []);

  useEffect(() => {
    const fetchWorkers = async () => {
      await DataStore.query(UserCredentials)
        .then(async (res) => {
          await Auth.currentAuthenticatedUser().then(async (authuser) => {
            await Auth.currentCredentials().then(async (credentials) => {
              console.log(credentials, authuser);
            });
          });

          let temp = [];
          if (res.length > 0) {
            res.forEach((item) => {
              temp.push({
                id: item.id,
                userId: item.userId,
                status: item.status,
                email: item.profile.email,
                name: `${item.profile.first_name} ${item.profile.last_name}`,
              });
            });
            setWorkers(temp);
          }
        })
        .catch((err) => console.warn(err));
    };

    fetchWorkers();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Typography variant="h4">{lang.title}</Typography>
          </Grid>
          <Grid item xs={6} md={1.5}>
            <Button variant="outlined" color="primary" fullWidth>
              {lang.buttons.filter}
            </Button>
          </Grid>
          <Grid item xs={6} md={1.5}>
            <Moreadd
              isEmpty={isEmpty}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              lang={lang.buttons}
            />
          </Grid>
        </Grid>
        <Collapse in={selectedIndex === 0}>
          <Receiptform isEmpty={isEmpty} setSelectedIndex={setSelectedIndex} lang={lang.addreceipt} />
        </Collapse>
        <Collapse in={selectedIndex === 1}>
          <Travelform isEmpty={isEmpty} setSelectedIndex={setSelectedIndex} />
        </Collapse>

        <ReceiptTabs isEmpty={isEmpty} lang={lang} />
      </Box>
    </Container>
  );
};
