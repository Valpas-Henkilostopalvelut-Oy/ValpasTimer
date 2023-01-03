import React, { useEffect, useState } from "react";
import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import { DataStore, Hub } from "aws-amplify";
import { UserCredentials, AllWorkSpaces } from "../../models/index.js";
import { Selectwork } from "./services/selectwork.jsx";
import { Selectuser } from "./services/selectuser.jsx";
import { Timelist } from "./services/timelist.jsx";
import { useAppContext } from "../../services/contextLib.jsx";

const Reports = () => {
  const [selWork, setSelWork] = useState("");
  const [selUser, setSelUser] = useState("");
  const [works, setWorks] = useState(null);
  const [workuser, setWorkers] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const { langValue } = useAppContext();
  const lang = langValue.reports;

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        setIsEmpty(data.isEmpty);
      }
    });
  }, []);

  useEffect(() => {
    let isActive = false;

    const loadWorks = async () => {
      await DataStore.query(AllWorkSpaces)
        .then((data) => {
          let w = [];
          for (let i = 0; i < data.length; i++) {
            let work = data[i];
            w.push({
              id: work.id,
              name: work.name,
              workers: work.workers,
            });
          }
          setWorks(w);
        })
        .catch((error) => console.warn(error));
    };

    !isActive && loadWorks();

    return () => (isActive = true);
  }, [selWork]);

  useEffect(() => {
    let isActive = false;

    const loadUsers = async () => {
      setSelUser("");
      setWorkers(null);

      await DataStore.query(UserCredentials)
        .then((users) => {
          let u = [];
          let workersIds = works.find((w) => w.id === selWork).workers;

          for (let i = 0; i < workersIds.length; i++) {
            let workerId = workersIds[i];
            let worker = users.find((u) => u.userId === workerId);
            u.push({
              id: worker.userId,
              name: `${worker.profile.first_name} ${worker.profile.last_name}`,
              email: worker.profile.email,
            });
          }
          setWorkers(u);
        })
        .catch((error) => console.warn(error));
    };

    !isActive && selWork !== "" && loadUsers();
  }, [selWork, works]);

  return (
    <Container>
      {works ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {lang.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Selectwork works={works} selectedOption={selWork} setSelectedOption={setSelWork} lang={lang} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Selectuser
              users={workuser}
              selectedOption={selUser}
              setSelectedOption={setSelUser}
              disabled={workuser === null && selWork === ""}
              lang={lang}
            />
          </Grid>

          <Timelist selWork={selWork} selUser={selUser} isEmpty={isEmpty} lang={lang} />
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default Reports;
