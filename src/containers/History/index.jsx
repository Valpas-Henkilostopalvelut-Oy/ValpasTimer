import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/contextLib";
import { Container, Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { DataStore, Auth, Hub } from "aws-amplify";
import { TimeEntry, AllWorkSpaces } from "../../models";
import { groupBy } from "../Timer/services/group.jsx";
import { WeekRow } from "../Timer/services/table.jsx";
import { MakePDF } from "../../components/MakePDF/index.jsx";
import { Selectwork } from "../Timer/services/workplaceselect";

export const History = () => {
  const { langValue } = useAppContext();
  const theme = useTheme();
  const [isEmpty, setIsEmpty] = useState(true);
  const [works, setWorks] = useState(null);
  const [confirmedWeeks, setConfirmedWeeks] = useState(null);
  const [selected, setSelected] = useState("");
  const lang = langValue.track;

  useEffect(() => {
    Hub.listen("datastore", (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "outboxStatus") {
        console.log(data);
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
              works: work.work,
            });
          }
          setWorks(w);
        })
        .catch((error) => console.warn(error));
    };

    !isActive && loadWorks();
  }, []);

  useEffect(() => {
    let isActive = false;

    const loadlist = async () => {
      await Auth.currentAuthenticatedUser().then(async (user) => {
        await DataStore.query(TimeEntry).then((data) => {
          const confirmedweek = data.filter(
            (a) =>
              !a.isActive &&
              a.userId === user.username &&
              (selected !== "" ? a.workspaceId === selected : true) &&
              (!a.isSent || a.isConfirmed)
          );
          setConfirmedWeeks(groupBy(confirmedweek, works, langValue));
        });
      });
    };

    !isActive && isEmpty && loadlist();

    return () => (isActive = true);
  }, [isEmpty, works, langValue, selected]);

  return (
    <Container
      sx={{
        [theme.breakpoints.down("sm")]: {
          padding: "0px",
        },
      }}
    >
      {works && confirmedWeeks ? (
        <Box
          sx={{
            backgroundColor: "track.green",

            [theme.breakpoints.up("sm")]: {
              padding: "10px",
            },
            [theme.breakpoints.down("sm")]: {
              padding: "10px 0px",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.paper",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Selectwork works={works} setSel={setSelected} sel={selected} lang={lang} />
          </Box>

          <Box
            sx={{
              backgroundColor: "background.paper",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              History
            </Typography>

            <MakePDF data={confirmedWeeks} isEmpty={isEmpty} works={works} selected={selected} />
          </Box>

          {confirmedWeeks.length > 0 ? (
            <WeekRow grouped={confirmedWeeks} lang={lang} isEmpty={isEmpty} works={works} selected={selected} />
          ) : (
            <Typography variant="h6" color="text.secondary">
              {lang.history.title.none_times}
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
