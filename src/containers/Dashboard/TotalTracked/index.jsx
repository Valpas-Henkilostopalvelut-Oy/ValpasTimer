import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { onError } from "../../../services/errorLib";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TotalLatest = ({ data, selOption }) => {
  const [time, setTime] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const loadTime = async () => {
      try {
        const times = (await DataStore.query(TimeEntry))
          .filter((u) => u.userId === data.owner)
          .filter((t) => t.workspaceId === selOption.id)
          .filter((a) => !a.isActive);

        setTime(times);
      } catch (error) {
        onError(error);
      }
    };

    loadTime();
  }, [data]);

  const Total = () => {
    if (time !== null) {
      let t = 0;
      for (let i = 0; i < time.length; i++) {
        t +=
          Date.parse(time[i].timeInterval.end) -
          Date.parse(time[i].timeInterval.start);
      }
      return (
        <TableCell>
          {new Date(t).getUTCHours() +
            ":" +
            String("0" + new Date(t).getUTCMinutes()).slice(-2) +
            ":" +
            String("0" + new Date(t).getUTCSeconds()).slice(-2)}
        </TableCell>
      );
    }
  };

  return (
    <React.Fragment>
      {time != null && (
        <TableRow>
          <TableCell>
            {time != null && time.length != 0 && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>

          <TableCell>
            {data.profile.first_name} {data.profile.last_name}
          </TableCell>

          <Total />
        </TableRow>
      )}
      {time != null && time.length != 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Time list
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Start time</TableCell>
                      <TableCell align="right">End time</TableCell>
                      <TableCell align="right">Total time</TableCell>
                      <TableCell align="right">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {time.map((inDate, key) => {
                      const total = new Date(
                        Date.parse(inDate.timeInterval.end) -
                          Date.parse(inDate.timeInterval.start)
                      );
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            {new Date(inDate.timeInterval.start).toDateString()}
                          </TableCell>

                          <TableCell align="right">
                            {new Date(inDate.timeInterval.start).getHours()}:
                            {String(
                              "0" +
                                new Date(inDate.timeInterval.start).getMinutes()
                            ).slice(-2)}
                          </TableCell>

                          <TableCell align="right">
                            {new Date(inDate.timeInterval.end).getHours()}:
                            {String(
                              "0" +
                                new Date(inDate.timeInterval.end).getMinutes()
                            ).slice(-2)}
                          </TableCell>

                          <TableCell align="right">
                            {new Date(total).getUTCHours() +
                              ":" +
                              String(
                                "0" + new Date(total).getUTCMinutes()
                              ).slice(-2) +
                              ":" +
                              String(
                                "0" + new Date(total).getUTCSeconds()
                              ).slice(-2)}
                          </TableCell>

                          <TableCell align="right">
                            {inDate.description}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default TotalLatest;
