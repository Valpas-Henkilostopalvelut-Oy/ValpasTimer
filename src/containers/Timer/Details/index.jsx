import React, { Fragment, useState } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { Table, TableBody, TableCell, TableRow, TableHead, Collapse, Box, IconButton } from "@mui/material";
import { TimeEditing } from "../../../components/TimeEditing/index.jsx";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SendForm, DeleteForm, WorkOfTime } from "./../Tools/index.jsx";
import { EditDescription } from "../EditDescription/index.jsx";

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

export const Details = ({ data, loadTimeList, index }) => {
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
        <TableCell>{data.date}</TableCell>
        <TableCell align="right">{startVal}</TableCell>
        <TableCell align="right">{endVal}</TableCell>
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
                    <TableCell>Edit</TableCell>
                    <TableCell>Work Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Start</TableCell>
                    <TableCell align="right">End</TableCell>
                    <TableCell align="right">Sent</TableCell>
                    <TableCell align="right">Confirmed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.arr.map((row) => (
                    <TableRow key={row.timeInterval.start}>
                      {!sent(data) && (
                        <TableCell>
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

                      <TableCell>
                        <WorkOfTime id={row.workspaceId} reload={loadTimeList} timeId={row.id} isSent={row.isSent} />
                      </TableCell>

                      <TableCell scope="row" sx={{ maxWidth: 400 }}>
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
