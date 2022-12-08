import React from "react";
import { Typography, Button, MenuItem, IconButton, Box } from "@mui/material";

import { fillWeek } from "./services/pdf.jsx";
import { PropTypes } from "prop-types";

export const MakePDF = ({ data, isEmpty, setEmpty, selected = "", works }) => {
  const handleClick = () => {
    fillWeek(data, selected, works);
  };

  return (
    selected && (
      <Button onClick={handleClick} disabled={!isEmpty} variant="contained">
        <Typography variant="p">Make PDF</Typography>
      </Button>
    )
  );
};

MakePDF.propTypes = {
  data: PropTypes.object,
  isEmpty: PropTypes.bool,
  setEmpty: PropTypes.func,
  selected: PropTypes.string,
};
