import React, { useState } from "react";
import { Box, Grid, Button, Typography, Collapse, Divider } from "@mui/material";
import { Cardtype } from "../../../models";
import AddIcon from "@mui/icons-material/Add";
import { AddCard } from "./addcard.jsx";
import { Carditem } from "./cardlist.jsx";
import { PropTypes } from "prop-types";
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

export const Cards = ({ data, workcards, id, isEmpty = false, lang }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Collapse in={workcards.length > 0}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">Own cards</Typography>
              </Grid>

              {workcards.map((card) => (
                <Carditem key={card.id} card={card} data={data} isEmpty={isEmpty} lang={lang} />
              ))}
            </Grid>
          </Collapse>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} align="right">
          <Button variant="contained" color="primary" size="small" onClick={handleClick} fullWidth>
            {open ? lang.close : lang.add}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <AddCard
            open={open}
            setOpen={setOpen}
            id={id}
            workcards={workcards}
            data={data}
            isEmpty={isEmpty}
            lang={lang}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Cards.propTypes = {
  data: PropTypes.object,
  workcards: PropTypes.array,
  id: PropTypes.string,
  isEmpty: PropTypes.bool,
};
