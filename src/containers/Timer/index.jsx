import React, { Fragment, useEffect, useState } from "react";
import "./timer.css";
import "../../App.css";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry } from "../../models";
import { useAppContext } from "../../services/contextLib";
import {
  Container,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  TableHead,
  Collapse,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Recorder from "./Recorder";
import TableToolBar from "./ListTableToolbar";
import TimeEditing from "../../components/TimeEditing";
import { groupBy } from "../../services/group";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
      placeholder="Add description"
      variant="standard"
    />
  ) : desc !== "" ? (
    <Typography variant="p">{desc}</Typography>
  ) : (
    <Typography variant="p">None description</Typography>
  );
};

const Row = ({ data, selected, setSelected, loadTimeList }) => {
  return (
    <Fragment>
      <TableRow>
        <TableCell colSpan={7}>{data.week} week</TableCell>
      </TableRow>
      {data.arr.map((byday, key) => (
        <Details
          data={byday}
          key={key}
          index={key}
          selected={selected}
          setSelected={setSelected}
          loadTimeList={loadTimeList}
        />
      ))}
    </Fragment>
  );
};

const Details = ({ data, selected, setSelected, loadTimeList, index }) => {
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const [open, setOpen] = useState(false);

  let start = new Date(data.arr[data.arr.length - 1].timeInterval.start);
  let end = new Date(data.arr[0].timeInterval.end);
  let total = new Date(Date.parse(end) - Date.parse(start));

  let totalVal = `${String("0" + total.getUTCHours()).slice(-2)}:${String("0" + total.getUTCMinutes()).slice(
    -2
  )}:${String("0" + total.getUTCSeconds()).slice(-2)}`;
  let startVal = `${String("0" + start.getHours()).slice(-2)}:${String("0" + start.getMinutes()).slice(-2)}`;
  let endVal = `${String("0" + end.getHours()).slice(-2)}:${String("0" + end.getMinutes()).slice(-2)}`;

  const isItemSelected = isSelected(data);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <Fragment>
      <TableRow key={index} hover role="checkbox" selected={isItemSelected} aria-checked={isItemSelected} tabIndex={-1}>
        <TableCell>
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
            onClick={(event) => !data.isSent && handleClick(event, data)}
          />
        </TableCell>

        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="right">{startVal}</TableCell>
        <TableCell align="right">{endVal}</TableCell>
        <TableCell align="right">{data.date}</TableCell>
        <TableCell align="right">{totalVal}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Start</TableCell>
                    <TableCell align="right">End</TableCell>
                    <TableCell align="right">Sent</TableCell>
                    <TableCell align="right">Confirmed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.arr.map((row) => (
                    <Fragment key={row.timeInterval.start}>
                      <TableRow>
                        <TableCell scope="row">
                          <EditDescription
                            description={row.description}
                            data={row}
                            id={row.id}
                            reload={loadTimeList}
                            isSent={row.isSent}
                          />
                        </TableCell>

                        <TableCell align="right">
                          <TimeEditing
                            time={row.timeInterval.start}
                            isSent={row.isSent}
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
                            isSent={row.isSent}
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
                            <CheckCircleIcon color="success" />
                          ) : (
                            <RadioButtonUncheckedIcon color="disabled" />
                          )}
                        </TableCell>

                        <TableCell align="right">
                          {row.isConfirmed ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <RadioButtonUncheckedIcon color="disabled" />
                          )}
                        </TableCell>
                      </TableRow>
                    </Fragment>
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
  const [timeList, setTimeList] = useState(null);
  const { isAuthenticated, selectedOption } = useAppContext();
  const [selected, setSelected] = useState([]);
  const [grouped, setGrouped] = useState([]);

  const loadTimeList = async () => {
    if (isAuthenticated && selectedOption !== null) {
      try {
        const databaseTimeList = await DataStore.query(TimeEntry);
        const currentUser = await Auth.currentAuthenticatedUser();

        const filtered = databaseTimeList
          .sort((date1, date2) => {
            let d1 = new Date(date2.timeInterval.start);
            let d2 = new Date(date1.timeInterval.start);
            return d1 - d2;
          })
          .filter((t) => t.workspaceId === selectedOption.id)
          .filter((a) => !a.isActive)
          .filter((u) => u.userId === currentUser.username);

        setTimeList(filtered);
        setGrouped(groupBy(filtered));
      } catch (error) {
        console.warn(error);
      }
    }
  };

  useEffect(() => {
    let isActive = false;

    !isActive && loadTimeList();

    return () => (isActive = true);
  }, [selectedOption]);

  return (
    <Container>
      <Recorder loadTimeList={loadTimeList} selectedOption={selectedOption} />

      {grouped != null && timeList != null && selectedOption != null && (
        <Fragment>
          <TableToolBar
            numSelected={selected.length}
            selected={selected}
            loadUpdate={loadTimeList}
            clearSelected={setSelected}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="right">Start</TableCell>
                  <TableCell align="right">End</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grouped.map((data, key) => (
                  <Row
                    data={data}
                    key={key}
                    selected={selected}
                    setSelected={setSelected}
                    loadTimeList={loadTimeList}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </Container>
  );
};

export default Timer;
