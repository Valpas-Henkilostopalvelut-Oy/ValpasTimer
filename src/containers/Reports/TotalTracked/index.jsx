import React, { useEffect, useState, Fragment } from "react";
import { DataStore } from "aws-amplify";
import { TimeEntry } from "../../../models";
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableBody } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { groupBy } from "../../../services/group";
import InList from "../InList";

const TotalLatest = ({ users, selOption, setSelected, selected }) => {
  const [time, setTime] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [grouped, setGrouped] = useState(null);

  useEffect(() => {
    let isActive = false;

    const loadTime = async () => {
      try {
        const times = (await DataStore.query(TimeEntry))
          .filter((u) => u.userId === users.owner)
          .filter((t) => t.workspaceId === selOption.id)
          .filter((a) => !a.isActive)
          .filter((a) => a.isSent);

        setTime(times);
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
      {time != null && (
        <TableRow>
          <TableCell>
            {time != null && time.length !== 0 && (
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>

          <TableCell align="right">
            {users.profile.first_name} {users.profile.last_name}
          </TableCell>
        </TableRow>
      )}
      {grouped != null && time != null && time.length !== 0 && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {grouped.map((week, index) => (
                      <Fragment key={index}>
                        <TableRow>
                          <TableCell>{week.week} week</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ padding: 0 }} colSpan={6}>
                            <Box>
                              <InList data={week} selected={selected} setSelected={setSelected} />
                            </Box>
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
      )}
    </React.Fragment>
  );
};

export default TotalLatest;
