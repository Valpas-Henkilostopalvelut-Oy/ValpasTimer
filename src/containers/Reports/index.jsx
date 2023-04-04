import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { DataStore, Hub } from "aws-amplify";
import { UserCredentials, AllWorkSpaces, TimeEntry } from "../../models/index.js";
import { Rowweek } from "./services/timelist.jsx";
import { groupBy } from "./services/group.jsx";

const Selectwork = ({ works, handleChangeWork, selectedWork }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-work-label">Valitse työtila</InputLabel>
      <Select
        labelId="select-work-label"
        id="select-work"
        value={selectedWork}
        label="Valitse työtila"
        onChange={handleChangeWork}
      >
        {works.map((work) => (
          <MenuItem key={work.id} value={work.id}>
            {work.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Selectworker = ({ workers, handleChangeWorker, selectedWorker, disabled = true }) => {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="select-worker-label">Valitse työntekijä</InputLabel>
      <Select
        labelId="select-worker-label"
        id="select-worker"
        value={selectedWorker}
        label="Valitse työntekijä"
        onChange={handleChangeWorker}
      >
        {workers &&
          workers.map((worker) => (
            <MenuItem key={worker.id} value={worker.id}>
              {worker.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const Reports = ({ lang }) => {
  const [selected, setSelected] = useState({ work: "", worker: "" });
  const [data, setData] = useState({ works: null, workers: null });
  const [timeList, setTimeList] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        setIsEmpty(data.isEmpty);
      }
    });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await DataStore.query(AllWorkSpaces)
        .then(async (works) => {
          const w = [];
          for (let i = 0; i < works.length; i++) {
            const work = works[i];
            w.push({
              id: work.id,
              name: work.name,
              workers: work.workers,
            });
          }
          setData((prev) => ({ ...prev, works: w }));

          if (selected.work !== "") {
            await DataStore.query(UserCredentials)
              .then((users) => {
                let u = [];
                let workersIds = works.find((w) => w.id === selected.work).workers;

                for (let i = 0; i < workersIds.length; i++) {
                  let workerId = workersIds[i];
                  let worker = users.find((u) => u.userId === workerId);
                  u.push({
                    id: worker.userId,
                    name: `${worker.profile.first_name} ${worker.profile.last_name}`,
                    email: worker.profile.email,
                  });
                }

                setData((prev) => ({ ...prev, workers: u }));
              })
              .catch((error) => console.warn(error));
          }
        })
        .catch((error) => console.warn(error));
    };

    loadData();
  }, [selected]);

  useEffect(() => {
    const loadTimelist = async () => {
      await DataStore.query(TimeEntry)
        .then((data) => {
          let fiteredData = data.filter(
            (item) =>
              item.workspaceId === selected.work && item.userId === selected.worker && !item.isActive && item.isSent
          );
          let grouped = groupBy(fiteredData);

          if (grouped.length > 0) {
            setTimeList(grouped);
          } else {
            setTimeList(null);
          }
        })
        .catch((error) => console.warn(error));
    };

    selected.worker !== "" && selected.work !== "" && isEmpty && loadTimelist();
  }, [selected, isEmpty]);

  const handleWorkChange = (e) => setSelected((prev) => ({ ...prev, work: e.target.value }));
  const handleWorkerChange = (e) => setSelected((prev) => ({ ...prev, worker: e.target.value }));

  return (
    <Container>
      {data.works ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Raporttit
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Selectwork works={data.works} handleChangeWork={handleWorkChange} selectedWork={selected.work} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Selectworker
              workers={data.workers}
              handleChangeWorker={handleWorkerChange}
              selectedWorker={selected.worker}
              disabled={selected.work === "" && data.workers === null}
            />
          </Grid>

          <Grid item container spacing={2} xs={12}>
            {timeList &&
              timeList.map((item) => {
                return (
                  <Rowweek
                    key={item.week}
                    timeList={item}
                    lang={lang}
                    isEmpty={isEmpty}
                    selected={selected}
                    data={data}
                  />
                );
              })}
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Reports;
