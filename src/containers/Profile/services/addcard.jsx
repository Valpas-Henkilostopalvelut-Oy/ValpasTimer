import React from "react";
import { Collapse, Grid } from "@mui/material";
import { Cardtype } from "../../../models";
import { PropTypes } from "prop-types";
import { Notaddedcard } from "./notaddedcard.jsx";
import img from "../assets/tyoturvallisuuskortti-2022.png";

export const cardtypes = (lang) => {
  return [
    { id: Cardtype.ID, name: lang.id, disabled: false, img: "" },
    { id: Cardtype.PASSPORT, name: lang.passport, disabled: false, img: "" },
    { id: Cardtype.DRIVING, name: lang.driving, disabled: false, img: "" },
    { id: Cardtype.HYGIENEPASS, name: lang.hygienepass, disabled: false, img: "" },
    { id: Cardtype.WORKSAFETYPASS, name: lang.worksafetypass, disabled: false, img: img },
    { id: Cardtype.FIREWORKCARD, name: lang.fireworkcard, disabled: false, img: "" },
    { id: Cardtype.ELECTRICALSAFETYPASS, name: lang.electricalsafetypass, disabled: false, img: "" },
    { id: Cardtype.OTHER, name: lang.other, disabled: false },
  ];
};

export const AddCard = ({ data, workcards, open, isEmpty, lang }) => {
  const notadded = cardtypes(lang.types).filter((obj2) => !workcards.some((obj1) => obj1.type === obj2.id));

  return (
    <Collapse in={open}>
      <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
        {notadded.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
            <Notaddedcard data={data} workcards={workcards} card={card} isEmpty={isEmpty} />
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
