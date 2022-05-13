import React, { useEffect, useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableBody } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { groupBy } from "../../../services/group";
import InList from "../InList";

const TotalLatest = ({ users, selOption, isAdmin, isClient, reload }) => {
  const [time, setTime] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [grouped, setGrouped] = useState(null);

  useEffect(() => {
    let isActive = false;

    const loadTime = async () => {
      try {
        const times = (await DataStore.query(TimeEntry))
          .filter((u) => u.userId === users.userId)
          .filter((t) => t.workspaceId === selOption)
          .filter((a) => !a.isActive)
          .filter((a) => a.isSent);

        setGrouped(groupBy(times));
      } catch (error) {
        console.warn(error);
      }
    };

    !isActive && loadTime();

    return () => (isActive = false);
  }, [users, selOption]);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          {grouped !== null && (
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>

        <TableCell align="right">
          {users.profile.first_name} {users.profile.last_name}
        </TableCell>
      </TableRow>

      {grouped != null && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {grouped.map((week, index) => {
                      let time = { h: 0, m: 0 };
                      for (let i = 0; i < week.arr.length; i++) {
                        let arr = week.arr[i];

                        for (let ii = 0; ii < arr.arr.length; ii++) {
                          const timeL = arr.arr[ii];
                          let start = new Date(timeL.timeInterval.start);
                          let end = new Date(timeL.timeInterval.end);

                          let total = new Date(Math.abs(end - start));

                          time = {
                            h: time.h + total.getUTCHours(),
                            m: time.m + total.getUTCMinutes(),
                          };

                          if (time.m > 60) {
                            time.h += Math.floor(time.m / 60);
                            time.m = time.m % 60;
                          }
                        }
                      }
                      return (
                        <Fragment key={index}>
                          <TableRow>
                            <TableCell>
                              {week.week} week. {time.h}h {time.m}min
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: 0 }} colSpan={6}>
                              <Box>
                                <InList data={week} isAdmin={isAdmin} isClient={isClient} reload={reload} />
                              </Box>
                            </TableCell>
                          </TableRow>
                        </Fragment>
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
