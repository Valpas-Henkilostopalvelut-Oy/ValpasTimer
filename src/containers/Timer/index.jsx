import React, { useEffect, useState } from "react";
import "./timer.css";
import "../../App.css";
import { DataStore } from "aws-amplify";
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
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import Recorder from "./Recorder";
import AddTime from "./AddTime";
import TableToolBar from "./ListTableToolbar";
import CustomTableHead from "./ListTableHead";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const Timer = () => {
  const [manual, setManual] = useState(false);
  const [timeList, setTimeList] = useState(null);
  const [workList, setWorkList] = useState([]);
  const { isAuthenticated, selectedOption } = useAppContext();
  const [selected, setSelected] = useState([]);

  const deleteItem = async (id) => {
    try {
      const itemToDelete = await DataStore.query(TimeEntry, id);
      await DataStore.delete(itemToDelete);
      loadTimeList();
      alert("Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const loadTimeList = async () => {
    if (isAuthenticated) {
      try {
        const databaseTimeList = await DataStore.query(TimeEntry);

        setTimeList(databaseTimeList);
      } catch (error) {
        onError(error);
      }
    }
  };

  useEffect(() => {
    loadTimeList();
  }, [isAuthenticated]);

  useEffect(() => {
    const loadWorkList = async () => {
      if (isAuthenticated) {
        try {
          const databaseWorkList = await DataStore.query(AllWorkSpaces);

          setWorkList(databaseWorkList);
        } catch (error) {
          onError(error);
        }
      }
    };
    loadWorkList();
  }, [isAuthenticated]);

  const lockTimeEntry = async (d) => {
    try {
      await DataStore.save(
        TimeEntry.copyOf(d, (updated) => {
          updated.isLocked = true;
        })
      );
      loadTimeList();
    } catch (error) {
      onError(error);
    }
  };

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

      {timeList != null && (
        <Paper>
          <TableToolBar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <CustomTableHead />
              <TableBody>
                {timeList
                  .sort((date1, date2) => date1.createdAt - date2.createdAt)
                  .map((data, key) => {
                    if (selectedOption === null) return;
                    if (data.isActive) return;
                    if (data.workspaceId !== selectedOption.id) return;

                    const total = new Date(
                      Date.parse(data.timeInterval.end) -
                        Date.parse(data.timeInterval.start)
                    );

                    return (
                      <TableRow
                        key={key}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Checkbox />
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {data.description == ""
                            ? "Add description"
                            : data.description}
                        </TableCell>

                        <TableCell align="right">
                          {new Date(data.timeInterval.start).getHours()}:
                          {String(
                            "0" + new Date(data.timeInterval.start).getMinutes()
                          ).slice(-2)}
                        </TableCell>

                        <TableCell align="right">
                          {new Date(data.timeInterval.end).getHours()}:
                          {String(
                            "0" + new Date(data.timeInterval.end).getMinutes()
                          ).slice(-2)}
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
                          <CheckCircleOutlinedIcon />
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
