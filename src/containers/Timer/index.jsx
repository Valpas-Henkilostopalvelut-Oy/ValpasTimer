import React, { Fragment, useEffect, useState } from "react";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry } from "../../models";
import { useAppContext } from "../../services/contextLib.jsx";
import {
  Container,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  Collapse,
  Box,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Recorder from "./Recorder/index.jsx";
import { TimeEditing } from "../../components/TimeEditing/index.jsx";
import { groupBy } from "../../services/group.jsx";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SendForm, DeleteForm, WorkOfTime } from "./Tools/index.jsx";
import WorkspaceSelect from "../../components/WorkSpaceSelect/index.jsx";

const updateValue = async ({ val, type, reload, id, time }) => {
  try {
    if (type === "start") {
      const d = await DataStore.query(TimeEntry, id);
      await DataStore.save(
        TimeEntry.copyOf(d, (update) => {
          update.timeInterval.start = new Date(new Date(time).setHours(val.h, val.m, 0)).toISOString();
        })
      );
      reload();
    } else if (type === "end") {
      const d = await DataStore.query(TimeEntry, id);
      await DataStore.save(
        TimeEntry.copyOf(d, (update) => {
          update.timeInterval.end = new Date(new Date(time).setHours(val.h, val.m, 0)).toISOString();
        })
      );
      reload();
    }
  } catch (error) {
    console.warn(error);
  }
};

const EditDescription = ({ reload, description, data, id, isSent }) => {
  const [desc, setDesc] = useState(description);

  const updateDesc = async () => {
    console.log(desc);
    try {
      await DataStore.save(
        TimeEntry.copyOf(data, (update) => {
          update.description = desc;
        })
      );
    } catch (error) {
      console.warn(error);
    }
  };

  return !isSent ? (
    <TextField
      onChange={(event) => setDesc(event.target.value)}
      onBlur={updateDesc}
      value={desc}
      fullWidth
      multiline
      rows={3}
      placeholder="Add description"
      variant="standard"
    />
  ) : desc !== "" ? (
    <Typography variant="p">{desc}</Typography>
  ) : (
    <Typography variant="p">None description</Typography>
  );
};

const Row = ({ data, loadTimeList }) => {
  let date = { h: 0, min: 0 };
  for (let i = 0; i < data.arr.length; i++) {
    let arr = data.arr[i];

    for (let ii = 0; ii < arr.arr.length; ii++) {
      const timeL = arr.arr[ii];
      let start = new Date(timeL.timeInterval.start).setMilliseconds(0);
      let end = new Date(timeL.timeInterval.end).setMilliseconds(0);

      let total = new Date(Math.abs(end - start));

      date = {
        h: date.h + total.getUTCHours(),
        min: date.min + total.getUTCMinutes(),
      };

      if (date.min > 60) {
        date.h += Math.floor(date.min / 60);
        date.min = date.min % 60;
      }
    }
  }

  return (
    <Fragment>
      <TableRow>
        <TableCell>{data.week} week</TableCell>
        <TableCell>
          {date.h}h {date.min}min
        </TableCell>
        <TableCell colSpan={5} />
      </TableRow>
      {data.arr.map((byday, key) => (
        <Details data={byday} key={key} index={key} loadTimeList={loadTimeList} />
      ))}
    </Fragment>
  );
};

const Details = ({ data, loadTimeList, index }) => {
  const [open, setOpen] = useState(false);

  let start = new Date(data.arr[data.arr.length - 1].timeInterval.start);
  let end = new Date(data.arr[0].timeInterval.end);
  let total = new Date(Date.parse(end) - Date.parse(start));

  let totalVal = `${String("0" + total.getUTCHours()).slice(-2)}:${String("0" + total.getUTCMinutes()).slice(
    -2
  )}:${String("0" + total.getUTCSeconds()).slice(-2)}`;
  let startVal = `${String("0" + start.getHours()).slice(-2)}:${String("0" + start.getMinutes()).slice(-2)}`;
  let endVal = `${String("0" + end.getHours()).slice(-2)}:${String("0" + end.getMinutes()).slice(-2)}`;

  const sent = (d) => {
    return d.arr.filter((item) => item.isSent).length === d.arr.length;
  };

  const confirmed = (d) => {
    return d.arr.filter((item) => item.isConfirmed).length === d.arr.length;
  };

  return (
    <Fragment>
      <TableRow key={index} hover role="checkbox" tabIndex={-1}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="right">{startVal}</TableCell>
        <TableCell align="right">{endVal}</TableCell>
        <TableCell align="right">{data.date}</TableCell>
        <TableCell align="right">{totalVal}</TableCell>
        <TableCell align="right">
          {sent(data) ? (
            <CheckCircleIcon style={{ color: "#4caf50" }} />
          ) : (
            <RadioButtonUncheckedIcon color="disabled" />
          )}
        </TableCell>
        <TableCell align="right">
          {confirmed(data) ? (
            <CheckCircleIcon style={{ color: "#4caf50" }} />
          ) : (
            <RadioButtonUncheckedIcon color="disabled" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Work Name</TableCell>
                    <TableCell align="right">Start</TableCell>
                    <TableCell align="right">End</TableCell>
                    <TableCell align="right">Sent</TableCell>
                    <TableCell align="right">Confirmed</TableCell>
                    {!sent(data) && <TableCell align="right">Edit</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.arr.map((row) => (
                    <TableRow key={row.timeInterval.start}>
                      <TableCell scope="row" sx={{ width: 400 }}>
                        <EditDescription
                          description={row.description}
                          data={row}
                          id={row.id}
                          reload={loadTimeList}
                          isSent={row.isSent}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <WorkOfTime id={row.workspaceId} reload={loadTimeList} timeId={row.id} isSent={row.isSent} />
                      </TableCell>

                      <TableCell align="right">
                        <TimeEditing
                          time={row.timeInterval.start}
                          isSent={!row.isSent}
                          onChange={(event) =>
                            updateValue({
                              id: row.id,
                              val: event,
                              type: "start",
                              reload: loadTimeList,
                              time: row.timeInterval.start,
                            })
                          }
                        />
                      </TableCell>

                      <TableCell align="right">
                        <TimeEditing
                          time={row.timeInterval.end}
                          isSent={!row.isSent}
                          onChange={(event) =>
                            updateValue({
                              id: row.id,
                              val: event,
                              type: "end",
                              reload: loadTimeList,
                              time: row.timeInterval.end,
                            })
                          }
                        />
                      </TableCell>

                      <TableCell align="right">
                        {row.isSent ? (
                          <CheckCircleIcon style={{ color: "#4caf50" }} />
                        ) : (
                          <RadioButtonUncheckedIcon color="disabled" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row.isConfirmed ? (
                          <CheckCircleIcon style={{ color: "#4caf50" }} />
                        ) : (
                          <RadioButtonUncheckedIcon color="disabled" />
                        )}
                      </TableCell>
                      {!sent(data) && (
                        <TableCell align="right">
                          <SendForm
                            id={row.id}
                            reload={loadTimeList}
                            isSent={row.isSent}
                            isConfirmed={row.isConfirmed}
                          />
                          <DeleteForm
                            id={row.id}
                            reload={loadTimeList}
                            isSent={row.isSent}
                            isConfirmed={row.isConfirmed}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const Timer = () => {
  const { isAuthenticated } = useAppContext();
  const [grouped, setGrouped] = useState([]);
  const [dense, setDense] = useState(false);
  const [selected, setSelected] = useState("");

  const loadTimeList = async () => {
    try {
      const databaseTimeList = await DataStore.query(TimeEntry);
      const currentUser = await Auth.currentAuthenticatedUser();

      const filtered = databaseTimeList
        .sort((date1, date2) => {
          let d1 = new Date(date2.timeInterval.start);
          let d2 = new Date(date1.timeInterval.start);
          return d1 - d2;
        })
        .filter((a) => !a.isActive)
        .filter((u) => u.userId === currentUser.username)
        .filter((w) => w.workspaceId === selected);

      setGrouped(groupBy(filtered));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    let isActive = false;

    !isActive && isAuthenticated && loadTimeList();

    return () => (isActive = true);
  }, [isAuthenticated, selected]);

  //loading if grouped, timelist and selected option are null

  return (
    <Container>
      {grouped != null ? (
        <Fragment>
          <Recorder loadTimeList={loadTimeList} />
          <WorkspaceSelect selectedOption={selected} setSelectedOption={setSelected} />
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 750 }} aria-label="workTable" size={dense ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="right">Start</TableCell>
                  <TableCell align="right">End</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Is Sent</TableCell>
                  <TableCell align="right">Confirmed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grouped.map((data, key) => (
                  <Row data={data} key={key} loadTimeList={loadTimeList} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
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

export default Timer;
