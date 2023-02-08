import React from "react";
import { Table, Typography, TableBody, TableCell, TableRow, Box } from "@mui/material";
import { Time } from "./times.jsx";
import { Breakreason } from "../../../models/index.js";
import { useAppContext } from "../../../services/contextLib.jsx";

const durationF = (start, end) => {
  let s = new Date(start);
  let e = new Date(end);
  let total = Date.parse(e) - Date.parse(s);

  let hours = Math.floor(total / (1000 * 60 * 60));
  let minutes = Math.floor((total / (1000 * 60)) % 60);

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
  };
};

const breaksArr = () => {
  const lang = useAppContext().langValue.service.breaks;
  return [
    { id: Breakreason.LUNCH, name: lang.lunch },
    { id: Breakreason.LUNCH_L, name: lang.lunch_l },
    { id: Breakreason.SHORT, name: lang.short },
    { id: Breakreason.LONG, name: lang.long },
    { id: Breakreason.GOING, name: lang.going },
    { id: Breakreason.ACCIDENT, name: lang.accident },
  ];
};

export const Breakslist = ({ date }) => {
  const breaks = date.break;

  return (
    breaks &&
    breaks.map((item, i) => {
      const duration = durationF(item.start, item.end);
      const reasone = item.reason
        ? breaksArr().filter((br) => br.id === item.reason).length > 0
          ? breaksArr().filter((br) => br.id === item.reason)[0].name
          : breaksArr().find((br) => br.id === Breakreason.GOING).name
        : breaksArr().find((br) => br.id === Breakreason.GOING).name;

      return (
        <TableRow key={i}>
          <TableCell>{reasone}</TableCell>
          <TableCell align="right">
            <Time time={item.start} /> - <Time time={item.end} />
          </TableCell>
          <TableCell align="right">
            <Typography variant="p">
              - {duration.hours}:{duration.minutes}
            </Typography>
          </TableCell>
        </TableRow>
      );
    })
  );
};
