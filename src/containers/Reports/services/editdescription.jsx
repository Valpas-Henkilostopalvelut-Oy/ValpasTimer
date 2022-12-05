import React from "react";
import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export const EDiscription = ({
  data,
  lang = {
    none_description: "No description",
  },
}) => {
  let desc = data.arr.filter((item) => item.description !== "");
  return desc.length > 0 ? <Typography variant="p">{desc.map((item) => item.description).join(", ")}</Typography> : <Typography variant="p">{lang.none_description}</Typography>;
};

EDiscription.propTypes = {
  data: PropTypes.object,
  lang: PropTypes.object,
};
