import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Button, Collapse, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Hub, DataStore, Auth } from "aws-amplify";
import ReceiptForm from "./ReceiptComponents/ReceiptForm.jsx";
import MoreAdd from "./ReceiptComponents/MoreAdd.jsx";
import TravelForm from "./TravelComponents/TravelForm.jsx";
import Filter from "./components/Filter.jsx";
import ReceiptList from "./ReceiptComponents/ReceiptList.jsx";
import TravelList from "./TravelComponents/TravelList.jsx";
import { useAppContext } from "../../services/contextLib.jsx";
import { UserCredentials } from "../../models/index.js";

const ReceiptTabs = (props) => {
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
        <TabPanel value="1" sx={{ p: "30px 0px" }}>
          <ReceiptList {...props} />
        </TabPanel>
        <TabPanel value="2" sx={{ p: "30px 0px" }}>
          <TravelList {...props} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

const Forms = (props) => {
  const { isEmpty, lang } = props;
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} />
        <Grid item xs={6} md={1.5}>
          <Filter {...props} />
        </Grid>
        <Grid item xs={6} md={1.5}>
          <MoreAdd
            isEmpty={isEmpty}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            lang={lang.buttons}
          />
        </Grid>
      </Grid>

      <Collapse in={selectedIndex === 0}>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Kuitti
        </Typography>
        <ReceiptForm {...props} setSelectedIndex={setSelectedIndex} />
      </Collapse>
      <Collapse in={selectedIndex === 1}>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Matkalasku
        </Typography>
        <TravelForm {...props} setSelectedIndex={setSelectedIndex} />
      </Collapse>
    </Box>
  );
};

const Receipt = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const lang = useAppContext().langValue.receipts;
  const [workers, setWorkers] = useState([]);
  const [currentWorker, setCurrentWorker] = useState("");
  const workerdata = workers.find((item) => item.id === currentWorker) || null;

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
        .then((res) => {
          const workers = res.map((item) => ({
            id: item.id,
            identityId: item.identityId,
            userId: item.userId,
            status: item.status,
            email: item.profile.email,
            name: `${item.profile.first_name} ${item.profile.last_name}`,
          }));
          setWorkers(workers);
        })
        .catch((err) => console.warn(err));
    };

    fetchWorkers();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Forms
          isEmpty={isEmpty}
          lang={lang}
          workers={workers}
          currentWorker={currentWorker}
          setCurrentWorker={setCurrentWorker}
        />
        <ReceiptTabs isEmpty={isEmpty} lang={lang} workerdata={workerdata} />
      </Box>
    </Container>
  );
};

export default Receipt;
