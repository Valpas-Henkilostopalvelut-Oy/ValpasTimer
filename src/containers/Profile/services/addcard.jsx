import React from "react";
import { Collapse, Grid } from "@mui/material";
import { Cardtype } from "../../../models";
import { PropTypes } from "prop-types";
import { Notaddedcard } from "./notaddedcard.jsx";
import { cardtypes } from "./cards.jsx";

export const AddCard = ({ data, workcards, open, isEmpty, lang }) => {
  const notadded = cardtypes(lang.types).filter((obj2) => !workcards.some((obj1) => obj1.type === obj2.id));

  return (
    <Collapse in={open}>
      <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
        {notadded.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
            <Notaddedcard data={data} workcards={workcards} card={card} isEmpty={isEmpty} lang={lang}/>
          </Grid>
        ))}
      </Grid>
    </Collapse>
  );
};

AddCard.propTypes = {
  data: PropTypes.object.isRequired,
  workcards: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  lang: PropTypes.object.isRequired,
};
