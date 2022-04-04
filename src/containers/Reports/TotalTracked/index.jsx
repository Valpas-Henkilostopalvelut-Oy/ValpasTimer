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
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ListHead from "../TimeListHead";
import HeadToolBar from "../ToolBar";

import ListBody from "../ListBody";

const TotalLatest = ({ data, selOption }) => {
  const [time, setTime] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const loadTime = async () => {
      try {
        const times = (await DataStore.query(TimeEntry))
          .filter((u) => u.userId === data.owner)
          .filter((t) => t.workspaceId === selOption.id)
          .filter((a) => !a.isActive)
          .filter((a) => a.isSent);

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

  const isSelected = (name) => selected.indexOf(name) !== -1;

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = time.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
                <HeadToolBar
                  numSelected={selected.length}
                  selected={selected}
                />
                <Table size="small" aria-label="purchases">
                  <ListHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={time.length}
                  />
                  <ListBody
                    time={time}
                    isSelected={isSelected}
                    handleClick={handleClick}
                  />
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
