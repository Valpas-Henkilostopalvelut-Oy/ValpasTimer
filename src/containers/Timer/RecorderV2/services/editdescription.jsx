import React from "react";
import { TextField, Box, Typography, useTheme } from "@mui/material";

export const EditDescription = ({ description, setDescription }) => {
  return (
    <TextField
      id="description"
      label="Description"
      variant="outlined"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      fullWidth
    />
  );
};
