import React, { useEffect, useState } from "react";
import { DataStore, Hub } from "aws-amplify";
import { AllWorkSpaces } from "../../models";
import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Box,
  Collapse,
  TextField,
  useTheme,
  Grid,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { Worklist } from "./services/userlist.jsx";
import { Creatework } from "./services/creatework";

const Workspaces = () => {
  const [works, setWorks] = useState([]);
  const theme = useTheme();
  const [isEmpty, setIsEmpty] = useState(true);

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

  const createNewWork = async (val, { setSubmitting }) => {
    try {
      const list = await DataStore.query(AllWorkSpaces);

      if (list.filter((l) => l.name === val.name).length === 0) {
        setSubmitting(true);

        await DataStore.save(
          new AllWorkSpaces({
            hourlyRate: { amount: 1500, currency: "EURO" },
            imageUrl: "http://aliquaauteproidentnonparia.net",
            memberships: [],
            name: val.name,
            workspaceSettings: { shortBreak: 15, dinnerBreak: 15 },
            workers: [],
            clientId: [],
            adminId: [],
            managerId: [],
          })
        );

        setSubmitting(false);
      } else console.warn("Already on");
    } catch (error) {
      console.warn(error);

      setSubmitting(false);
    }
  };

  return (
    <Container
      sx={{
        [theme.breakpoints.down("sm")]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Työpaikat</Typography>
        </Grid>
        <Grid item xs={6}>
          <Creatework />
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
              <Worklist data={work} />
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Workspaces;
