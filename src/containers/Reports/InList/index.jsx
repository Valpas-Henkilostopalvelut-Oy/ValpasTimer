import React, { Fragment } from "react";
import {
  Checkbox,
  TableCell,
  IconButton,
  TableRow,
  TableBody,
  Typography,
  Table,
  TableHead,
  Box,
  Collapse,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useAppContext } from "../../../services/contextLib";
import { TimeEditing } from "../../../components/TimeEditing";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { Confirm, Unconfirm, Delete } from "../Tools";

const start = (val) => {
  let start = new Date(val);
  let startVal = `${String("0" + start.getHours()).slice(-2)}:${String("0" + start.getMinutes()).slice(-2)}`;
  return startVal;
};

const end = (val) => {
  let end = new Date(val);
  let endVal = `${String("0" + end.getHours()).slice(-2)}:${String("0" + end.getMinutes()).slice(-2)}`;
  return endVal;
};

const total = (s, e) => {
  let total = new Date(Date.parse(e) - Date.parse(s));
  let totalVal = `${String("0" + total.getUTCHours()).slice(-2)}:${String("0" + total.getUTCMinutes()).slice(
    -2
  )}:${String("0" + total.getUTCSeconds()).slice(-2)}`;
  return totalVal;
};

const updateTime = async (val, id, type) => {
  let time = new Date().setHours(val.h, val.m, 0);
  const original = await DataStore.query(TimeEntry, id).catch((err) => console.warn(err));
  await DataStore.save(
    TimeEntry.copyOf(original, (update) => {
      if (type === "start") {
        update.timeInterval.start = new Date(time).toISOString();
      } else if (type === "end") {
        update.timeInterval.end = new Date(time).toISOString();
      }
    })
  ).catch((err) => console.warn(err));
};

const confirmed = (d) => {
  return d.arr.filter((item) => item.isConfirmed).length === d.arr.length;
};

const InList = ({ data, isAdmin = false, isClient = false, reload }) => {
  const [open, setOpen] = React.useState(false);

  const { groups } = useAppContext();
  return (
    <Table aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Date</TableCell>
          <TableCell align="right">Start time</TableCell>
          <TableCell align="right">End time</TableCell>
          <TableCell align="right">Total time</TableCell>
          <TableCell align="right">Confirmed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.arr.map((row, index) => (
          <Fragment key={index}>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{start(row.arr[row.arr.length - 1].timeInterval.start)}</TableCell>

              <TableCell align="right">{end(row.arr[0].timeInterval.end)}</TableCell>

              <TableCell align="right">
                {total(row.arr[row.arr.length - 1].timeInterval.start, row.arr[0].timeInterval.end)}
              </TableCell>

              <TableCell align="right">
                {confirmed(row) ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon color="disabled" />}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={7} style={{ padding: 0 }}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box>
                    <Table aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Start</TableCell>
                          <TableCell align="right">End</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Confirmed</TableCell>
                          {(isAdmin || !confirmed(row)) && <TableCell align="right">Edit</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.arr.map((inarr) => {
                          return (
                            <TableRow key={inarr.id}>
                              <TableCell>
                                {inarr.description === "" ? (
                                  <Typography variant="p">Without description</Typography>
                                ) : (
                                  <Typography variant="p">{inarr.description}</Typography>
                                )}
                              </TableCell>

                              <TableCell align="right">
                                <TimeEditing
                                  time={inarr.timeInterval.start}
                                  isAdmin={groups.includes("Admins")}
                                  onChange={(val) => updateTime(val, inarr.id, "start")}
                                />
                              </TableCell>

                              <TableCell align="right">
                                <TimeEditing
                                  time={inarr.timeInterval.end}
                                  isAdmin={groups.includes("Admins")}
                                  onChange={(val) => updateTime(val, inarr.id, "end")}
                                />
                              </TableCell>

                              <TableCell align="right">
                                {total(inarr.timeInterval.start, inarr.timeInterval.end)}
                              </TableCell>

                              <TableCell align="right">
                                {inarr.isConfirmed ? (
                                  <CheckCircleIcon color="success" />
                                ) : (
                                  <RadioButtonUncheckedIcon color="disabled" />
                                )}
                              </TableCell>
                              {(isAdmin || !confirmed(row)) && (
                                <TableCell align="right">
                                  {!inarr.isConfirmed && <Confirm timeId={inarr.id} reload={reload} />}
                                  {inarr.isConfirmed && isAdmin && <Unconfirm timeId={inarr.id} reload={reload} />}
                                  {isAdmin && <Delete timeId={inarr.id} reload={reload} />}
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default InList;
