import React from "react";
import { Typography } from "@mui/material";

export const EDiscription = ({ data }) => {
  let desc = data.arr.filter((item) => item.description !== "");
  return desc.length > 0 ? (
    <Typography variant="p">{desc.map((item) => item.description).join(", ")}</Typography>
  ) : (
    <Typography variant="p">No description</Typography>
  );
};
