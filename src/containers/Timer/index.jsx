import React, { useEffect, useState } from "react";
import "./timer.css";
import "../../App.css";
import { DataStore, Auth } from "aws-amplify";
import { TimeEntry, AllWorkSpaces } from "../../models";
import { onError } from "../../services/errorLib";
import { useAppContext } from "../../services/contextLib";
import {
  Switch,
  Container,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  TextField,
} from "@mui/material";
import Recorder from "./Recorder";
import AddTime from "./AddTime";
import TableToolBar from "./ListTableToolbar";
import CustomTableHead from "./ListTableHead";
import TimeEditing from "../../components/TimeEditing";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const Timer = () => {
  const [manual, setManual] = useState(false);
  const [timeList, setTimeList] = useState(null);
  const { isAuthenticated, selectedOption } = useAppContext();
  const [selected, setSelected] = useState([]);

  const loadTimeList = async () => {
    if (isAuthenticated && selectedOption !== null) {
      try {
        const databaseTimeList = await DataStore.query(TimeEntry);
        const currentUser = await Auth.currentAuthenticatedUser();

        setTimeList(
          databaseTimeList
            .filter((t) => t.workspaceId === selectedOption.id)
            .filter((a) => !a.isActive)
            .filter((u) => u.userId === currentUser.username)
        );
      } catch (error) {
        console.warn(error);
      }
    }
  };

  useEffect(() => {
    loadTimeList();
    setSelected([]);
  }, [selectedOption]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = timeList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Container>
      <Grid container alignItems="center" spacing={2}>
        <Grid item md={11}>
          {!manual ? (
            <Recorder
              loadTimeList={loadTimeList}
              selectedOption={selectedOption}
            />
          ) : (
            <AddTime />
          )}
        </Grid>

        <Grid item md={1}>
          <Switch
            checked={manual}
            onChange={() => setManual(!manual)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>

      {timeList != null && selectedOption != null && (
        <Paper>
          <TableToolBar
            numSelected={selected.length}
            selected={selected}
            loadUpdate={loadTimeList}
            clearSelected={setSelected}
          />
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <CustomTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={timeList.length}
              />
              <TableBody>
                {timeList
                  .sort((date1, date2) => {
                    let d1 = new Date(date2.timeInterval.start);
                    let d2 = new Date(date1.timeInterval.start);
                    return d1 - d2;
                  })
                  .map((data, key) => {
                    const total = new Date(
                      Date.parse(data.timeInterval.end) -
                        Date.parse(data.timeInterval.start)
                    );
                    const isItemSelected = isSelected(data.id);
                    const labelId = `enhanced-table-checkbox-${key}`;

                    return (
                      <TableRow
                        key={key}
                        hover
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        onClick={(event) =>
                          !data.isSent && handleClick(event, data.id)
                        }
                      >
                        <TableCell>
                          {!data.isSent && (
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          )}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {data.description == ""
                            ? "Add description"
                            : data.description}
                        </TableCell>

                        <TableCell align="right">
                          <TimeEditing
                            time={data.timeInterval.start}
                            data={data}
                            type="start"
                          />
                        </TableCell>

                        <TableCell align="right">
                          <TimeEditing
                            time={data.timeInterval.end}
                            data={data}
                            type="end"
                          />
                        </TableCell>

                        <TableCell align="right">
                          {new Date(data.timeInterval.start).toDateString()}
                        </TableCell>

                        <TableCell align="right">
                          {total.getUTCHours()}:
                          {String("0" + total.getUTCMinutes()).slice(-2)}:
                          {String("0" + total.getUTCSeconds()).slice(-2)}
                        </TableCell>

                        <TableCell align="right">
                          {!data.isConfirmed ? (
                            <RadioButtonUncheckedIcon color="primary" />
                          ) : (
                            <CheckCircleIcon color="success" />
                          )}
                        </TableCell>

                        <TableCell align="right">
                          {!data.isSent ? (
                            <RadioButtonUncheckedIcon color="primary" />
                          ) : (
                            <CheckCircleIcon color="success" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default Timer;
