import React, { useEffect, useState } from "react";
import { DataStore, Hub } from "aws-amplify";
import { AllWorkSpaces } from "../../models";
import { Container, Box, useTheme, Grid, Typography } from "@mui/material";
import { Worklist } from "./services/userlist.jsx";
import { Creatework } from "./services/creatework";
import { useAppContext } from "../../services/contextLib";

const Workspaces = () => {
  const [works, setWorks] = useState([]);
  const theme = useTheme();
  const [isEmpty, setIsEmpty] = useState(true);
  const { langValue } = useAppContext();

  const lang = langValue.workplaces || {
    title: "Workplaces",
    create_workplace: "Create workplace",
    settings: "Settings",
    worker_name: "Worker name",
    create_work: {
      title: "Create workplace",
      name: "Name",
      create: "Create",
      cancel: "Cancel",
    },
    allert_workplace: {
      title: "Confirm to delete this workplace",
      message: "Are you sure you want to delete",
      confirm: "Confirm",
      cancel: "Cancel",
    },
    allert_worker: {
      title: "Confirm to delete this worker",
      message: "Are you sure you want to delete",
      message2: "from",
      confirm: "Confirm",
      cancel: "Cancel",
    },
  };

  useEffect(() => {
    let isActive = false;

    const loadWorks = async () => {
      try {
        const AllWorks = await DataStore.query(AllWorkSpaces);
        AllWorks.length !== 0 && setWorks(AllWorks);
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && isEmpty && loadWorks();

    return () => (isActive = true);
  }, [isEmpty]);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
        setIsEmpty(data.isEmpty);
      }
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">{lang.title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Creatework lang={lang} />
        </Grid>
      </Grid>
      <Box>
        {works &&
          works.map((work, index) => (
            <Box
              key={index}
              sx={{
                paddingTop: theme.spacing(2),
              }}
            >
              <Worklist data={work} lang={lang} />
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Workspaces;