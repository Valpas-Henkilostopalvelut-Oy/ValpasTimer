import React, { useState } from "react";
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { fillWeek } from "./services/pdf.jsx";
import { PropTypes } from "prop-types";

export const MakePDF = ({ data, isEmpty, selected = "", works }) => {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    //fillWeek(data, selected, works);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} disabled={!isEmpty} variant="contained">
        <Typography variant="p">PDF</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>PDF</DialogTitle>
      </Dialog>
    </>
  );
};

MakePDF.propTypes = {
  data: PropTypes.array,
  isEmpty: PropTypes.bool,
  selected: PropTypes.string,
  works: PropTypes.array,
};
