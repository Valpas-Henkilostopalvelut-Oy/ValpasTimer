import React from "react";
import { Typography, Box, Divider, Tabs, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

export const Details = ({ cognito, data }) => {
  return (
    <Box>
      <Box
        sx={{
          height: "120px",
          background:
            "linear-gradient(90deg, rgba(255,102,0,0.2973783263305322) 0%, rgba(0,173,239,0.3029805672268907) 100%)",
          borderRadius: "100px 0px 100px 0px",
        }}
      />
      <TableContainer>
        <Table aria-label="User details table">
          <TableBody>
            <TableRow>
              <TableCell width={"35%"}>Name</TableCell>
              <TableCell>
                {cognito.name} {cognito.family_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={"35%"}>Email</TableCell>
              <TableCell>{cognito.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={"35%"}>Phone</TableCell>
              <TableCell>{cognito.phone_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={"35%"}>City</TableCell>
              <TableCell>{cognito.locale !== undefined ? cognito.locale : "null"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={"35%"}>Birthdate</TableCell>
              <TableCell>{cognito.birthdate !== undefined ? cognito.birthdate : "null"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={"35"}>Nationality</TableCell>
              <TableCell>
                {cognito["custom:nationality"] !== undefined ? cognito["custom:nationality"] : "null"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
