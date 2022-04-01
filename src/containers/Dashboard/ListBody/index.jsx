import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableBody,
  TableRow,
  Checkbox,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const ListBody = ({ time, isSelected, handleClick }) => {
  const [list, setList] = useState(null);
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

        res[by] = res[by] || [];
        res[by].push(val);
        return res;
      }, []);
  };

  useEffect(() => {
    let isActive = false;

    !isActive && setList(groupBy(time));

    return () => (isActive = true);
  }, [time]);

  return (
    <TableBody>
      {time
        .sort((date1, date2) => {
          let d1 = new Date(date2.timeInterval.start);
          let d2 = new Date(date1.timeInterval.start);
          return d1 - d2;
        })
        .map((inDate, key) => {
          const total = new Date(
            Date.parse(inDate.timeInterval.end) -
              Date.parse(inDate.timeInterval.start)
          );

          const labelId = `enhanced-table-checkbox-${key}`;
          const isItemSelected = isSelected(inDate.id);

          return (
            <TableRow
              key={key}
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
              onClick={(event) =>
                !inDate.isConfirmed && handleClick(event, inDate.id)
              }
            >
              <TableCell>
                {!inDate.isConfirmed && (
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                )}
              </TableCell>

              <TableCell>
                {new Date(inDate.timeInterval.start).toDateString()}
              </TableCell>

              <TableCell align="right">{inDate.description}</TableCell>

              <TableCell align="right">
                {new Date(inDate.timeInterval.start).getHours()}:
                {String(
                  "0" + new Date(inDate.timeInterval.start).getMinutes()
                ).slice(-2)}
              </TableCell>

              <TableCell align="right">
                {new Date(inDate.timeInterval.end).getHours()}:
                {String(
                  "0" + new Date(inDate.timeInterval.end).getMinutes()
                ).slice(-2)}
              </TableCell>

              <TableCell align="right">
                {new Date(total).getUTCHours() +
                  ":" +
                  String("0" + new Date(total).getUTCMinutes()).slice(-2) +
                  ":" +
                  String("0" + new Date(total).getUTCSeconds()).slice(-2)}
              </TableCell>

              <TableCell align="right">
                {!inDate.isConfirmed ? (
                  <RadioButtonUncheckedIcon color="primary" />
                ) : (
                  <CheckCircleIcon color="success" />
                )}
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default ListBody;
