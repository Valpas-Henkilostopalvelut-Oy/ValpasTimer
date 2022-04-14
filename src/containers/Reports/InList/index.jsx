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

const Row = ({ row, index, handleClick, isSelected }) => {
  const [open, setOpen] = React.useState(false);

  const isItemSelected = isSelected(row);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <Fragment>
      <TableRow key={index} hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected}>
        <TableCell>
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            onClick={(event) => handleClick(event, row)}
          />
        </TableCell>
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

        <TableCell align="right">conf</TableCell>
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

                        <TableCell align="right">{start(inarr.timeInterval.start)}</TableCell>

                        <TableCell align="right">{end(inarr.timeInterval.end)}</TableCell>

                        <TableCell align="right">{total(inarr.timeInterval.start, inarr.timeInterval.end)}</TableCell>

                        <TableCell align="right">
                          {inarr.isConfirmed ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <RadioButtonUncheckedIcon color="disabled" />
                          )}
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
    </Fragment>
  );
};

const InList = ({ data, selected, setSelected }) => {
  const isSelected = (id) => selected.indexOf(id) !== -1;

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

  return (
    <Table aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell />
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
          <Row row={row} index={index} key={index} handleClick={handleClick} isSelected={isSelected} />
        ))}
      </TableBody>
    </Table>
  );
};

export default InList;
