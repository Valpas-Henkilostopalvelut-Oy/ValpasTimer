import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableBody,
  TableRow,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ListBody = ({ time, isSelected, handleClick }) => {
  const [list, setList] = useState(null);
  const [open, setOpen] = useState(false);

  const groupBy = (array) => {
    return array
      .sort((date1, date2) => {
        let d1 = new Date(date2.timeInterval.start);
        let d2 = new Date(date1.timeInterval.start);
        return d1 - d2;
      })
      .reduce((res, val) => {
        const dat = new Date(val.timeInterval.start);
        const by = dat.toDateString();

        if (res.filter((r) => r.date === by).length === 0) {
          res.push({
            index: Number(res.length + 1),
            arr: [],
            date: by,
          });

          res.find((r) => r.date === by).arr.push(val);
        } else {
          res.find((r) => r.date === by).arr.push(val);
        }

        return res;
      }, []);
  };

  useEffect(() => {
    let isActive = false;

    !isActive && setList(groupBy(time));

    return () => (isActive = true);
  }, [time]);

  console.log(list);

  return (
    <TableBody>
      {list !== null &&
        list.map((row, index) => {
          let start = new Date(row.arr[row.arr.length - 1].timeInterval.start);
          let end = new Date(row.arr[0].timeInterval.end);
          let total = new Date(Date.parse(end) - Date.parse(start));

          let totalVal = `${String("0" + total.getUTCHours()).slice(
            -2
          )}:${String("0" + total.getUTCMinutes()).slice(-2)}:${String(
            "0" + total.getUTCSeconds()
          ).slice(-2)}`;
          let startVal = `${String("0" + start.getHours()).slice(-2)}:${String(
            "0" + start.getMinutes()
          ).slice(-2)}`;
          let endVal = `${String("0" + end.getHours()).slice(-2)}:${String(
            "0" + end.getMinutes()
          ).slice(-2)}`;

          return (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">desc</TableCell>
              <TableCell align="right">{startVal}</TableCell>
              <TableCell align="right">{endVal}</TableCell>
              <TableCell align="right">{totalVal}</TableCell>
              <TableCell align="right">conf</TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default ListBody;
