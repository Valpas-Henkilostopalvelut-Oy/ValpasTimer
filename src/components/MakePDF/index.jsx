import React from "react";
import { Typography, Button } from "@mui/material";

import { fillWeek } from "./services/pdf.jsx";
import { PropTypes } from "prop-types";

export const MakePDF = ({ data, isEmpty, selected = "", works }) => {
  const handleClick = () => {
    fillWeek(data, selected, works);
  };

  return (
    selected && (
      <Button onClick={handleClick} disabled={!isEmpty} variant="contained">
        <Typography variant="p">PDF</Typography>
      </Button>
    )
  );
};

MakePDF.propTypes = {
  data: PropTypes.array,
  isEmpty: PropTypes.bool,
  selected: PropTypes.string,
  works: PropTypes.array,
};
