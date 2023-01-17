import React, { useState } from "react";
import { Box, Table, TableCell, TableContainer, TableRow, IconButton, TableHead } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddCard } from "./addcard.jsx";
import { Carditem } from "./cardlist.jsx";

export const Cards = ({ data, workcards, id, isEmpty = false }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  console.log(workcards);

  return (
    <Box>
      <TableContainer>
        <Table aria-label="Card details table">
          <TableHead>
            <TableRow>
              <TableCell>Card Type</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell align="right">Card Image</TableCell>
              <TableCell align="right">
                <IconButton aria-label="upload new card" onClick={handleClick}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <AddCard open={open} setOpen={setOpen} id={id} workcards={workcards} data={data} isEmpty={isEmpty} />
              </TableCell>
            </TableRow>

            {workcards && workcards.map((card) => <Carditem key={card.id} card={card} data={data} isEmpty={isEmpty} />)}
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
};
